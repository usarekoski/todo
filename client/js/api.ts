import * as messageTypes from '../../messageTypes';
import { SaveStatus, Todo } from './types';

const apiUrl = 'api/todos';

export async function saveTodos(todos: Todo[]): Promise<string> {
  const items: messageTypes.postListReq =
    todos.map(({ text, done, id, saveStatus }) => ({ text, done }));

  const init = {
    method: 'POST',
    body: new Blob(
      [JSON.stringify(items)],
      { type : 'application/json' },
    ),
  };

  const req = new Request(apiUrl, init);

  const res = await fetch(req);

  if (!res.ok) {
    throw new Error('Connection failed.');
  }

  const resBody: messageTypes.postListRes = await res.json();
  return resBody.list_id;
}

export async function updateTodos(todos: Todo[], listId: string): Promise<void> {
  const items: messageTypes.patchListReq = todos
    .filter((todo) => todo.saveStatus !== SaveStatus.Saved)
    .map(({ text, done, id, saveStatus }) => ({
      text,
      done,
      item_id: saveStatus === SaveStatus.Modified ? id : undefined,
    }));

  const init = {
    method: 'PATCH',
    body: new Blob(
      [JSON.stringify(items)],
      { type : 'application/json' },
    ),
  };

  const req = new Request(`${apiUrl}/${encodeURIComponent(listId)}`, init);

  const res = await fetch(req);

  if (!res.ok) {
    throw new Error('Connection failed.');
  }
}

export async function loadTodos(id: string): Promise<Todo[]> {

  const req = new Request(`${apiUrl}/${id}`, { method: 'GET' });

  const res = await fetch(req);

  if (!res.ok) {
    throw new Error('Connection failed.');
  }

  const resBody: messageTypes.getListRes = await res.json();

  return resBody.map((item) => ({
    text: item.text,
    id: item.item_id,
    done: item.done,
    saveStatus: SaveStatus.Saved,
  }));
}
