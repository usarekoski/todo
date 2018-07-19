import sqlite3 = require('sqlite3');
import util = require('util');

/**
 * Wrap sqlite3 functions from callbacks to Promises.
 */

sqlite3.verbose();

export function connect(filename: string): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(filename, (err) => {
      if (err === null) {
        resolve(db);
      } else {
        reject(err);
      }
    });
  });
}

export function prepare(db: sqlite3.Database, sql: string): Promise<sqlite3.Statement> {
  return new Promise((resolve, reject) => {
    db.prepare(sql, function(err) {
      if (err === null) {
        resolve(this);
      } else {
        // Syntax error does not have stack trace with it
        // so generate it and add sql for debugging.
        Error.captureStackTrace(err);
        err.message = err.message + '\n' + sql;
        reject(err);
      }
    });
  });
}

export function all(statement: sqlite3.Statement, params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    statement.all(params, (err, rows) => {
      if (err === null) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
}

export function run(statement: sqlite3.Statement, params: any = []): Promise<void> {
  return new Promise((resolve, reject) => {
    statement.run(params, (err) => {
      if (err === null) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

export function finalize(statement: sqlite3.Statement): Promise<void> {
  return new Promise((resolve, reject) => {
    statement.finalize((err) => {
      if (err === null) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}
