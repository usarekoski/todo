import Ajv = require('ajv');
import assert = require('assert');
import express = require('express');
import uuid = require('uuid/v4');
import * as messageTypes from '../messageTypes';
import * as sqlite from './sqliteWithPromises';

const ajv = new Ajv();

async function setupDB() {
  const db = await sqlite.connect(':memory:');

  await sqlite.run((await sqlite.prepare(db, `
    CREATE TABLE todos(
      item_id INTEGER PRIMARY KEY,
      list_id TEXT NOT NULL,
      text TEXT NOT NULL,
      done BOOLEAN NOT NULL,
      CHECK(done IN (0, 1))
    );
  `)));

  return {
    beginTransaction: await sqlite.prepare(db, `
      BEGIN TRANSACTION`,
    ),
    endTransaction: await sqlite.prepare(db, `
      COMMIT`,
    ),
    rollback: await sqlite.prepare(db, `
      ROLLBACK`,
    ),
    getList: await sqlite.prepare(db, `
      SELECT list_id, item_id, text, done
      FROM todos
      WHERE list_id = $list_id;`,
    ),
    insertItem: await sqlite.prepare(db, `
      INSERT INTO todos (list_id, text, done)
      VALUES ($list_id, $text, $done);`,
    ),
    updateItem: await sqlite.prepare(db, `
      UPDATE todos
      SET text = $text, done = $done
      WHERE item_id = $item_id AND list_id = $list_id`,
    ),
  };
}

const postListReqSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
      },
      done: {
        type: 'boolean',
      },
    },
    required: ['text', 'done'],
  },
};

const patchListReqSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
      },
      done: {
        type: 'boolean',
      },
      item_id: {
        type: 'number',
      },
    },
    required: ['text', 'done'],
  },
};

type dbRow = {
  done: number,
  text: string,
  item_id: number,
  list_id: string,
};

type getListRes = Array<{
  done: boolean,
  text: string,
  item_id: number,
  list_id: string,
}>;

function validateBody(schema: object) {
  const validate = ajv.compile(schema);

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const valid = validate(req.body);
    assert(typeof valid === 'boolean');

    if (valid) {
      next();
    } else {
      res.status(400);
      console.log(validate.errors);
      res.json();
    }
  };
}

export default async function createRoutes() {
  const {
    getList,
    insertItem,
    updateItem,
    beginTransaction,
    endTransaction,
    rollback,
  } = await setupDB();

  const router = express.Router();

  router.get('/:list_id', async (req, res) => {
    const { list_id } = req.params;
    const rows: dbRow[] = await sqlite.all(getList, { $list_id: list_id });
    const items: messageTypes.getListRes = rows
      .map((row) => Object.assign(row, { done: Boolean(row.done) }));

    if (items.length === 0) {
      res.status(404);
    }
    res.json(items);
  });

  router.post('/', validateBody(postListReqSchema), async (req, res) => {
    const items = req.body as messageTypes.postListReq;
    const listId = uuid();
    await Promise.all(items.map(({ text, done }) =>
      sqlite.run(
        insertItem,
        { $list_id: listId, $text: text, $done: done },
      ),
    ));

    res.status(201);
    const resBody: messageTypes.postListRes = { list_id: listId };
    res.json(resBody);
  });

  router.patch('/:list_id', validateBody(patchListReqSchema), async (req, res) => {
    const items = req.body as messageTypes.patchListReq;
    const { list_id } = req.params;

    await sqlite.run(beginTransaction);

    try {
      // Update existing items and create new items.
      await Promise.all([
        items
        .filter((item) => Boolean(item.item_id))
        .map(({item_id, text, done}) => sqlite.run(
          updateItem,
          { $list_id: list_id, $item_id: item_id, $text: text, $done: done },
        )),
        items
        .filter((item) => !Boolean(item.item_id))
        .map(({ text, done}) => sqlite.run(
          insertItem,
          { $list_id: list_id, $text: text, $done: done },
        )),
      ]);
    } catch (e) {
       await sqlite.run(rollback);
       throw e;
     }

    await sqlite.run(endTransaction);

    res.status(201);
    res.json();
  });

  return router;
}
