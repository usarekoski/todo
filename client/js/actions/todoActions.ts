import { Store } from 'redux';
import * as api from '../api';
import { Todo } from '../types';

// DB uses positive integers,
// so use negative integers to avoid collisions.
let nextTodoId = Number.MIN_SAFE_INTEGER;

function createId(): number {
  const id = nextTodoId;
  nextTodoId += 1;
  if (id >= -1) {
    throw new Error("Out of id's");
  }
  return id;
}

export enum ActionTypes {
  TODO_CREATE = 'TODO_CREATE',
  TODO_DELETE = 'TODO_DELETE',
  TODO_DONE = 'TODO_DONE',
  SAVING = 'SAVING',
  SAVE_SUCCESS = 'SAVE_SUCCESS',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',
  LOADING = 'LOADING',
  SAVE_FAIL = 'SAVE_FAIL',
  LOAD_SUCCESS = 'LOAD_SUCCESS',
  LOAD_FAIL = 'LOAD_FAIL',
}

const createTodo = (text: string) => ({
  id: createId(),
  type: ActionTypes.TODO_CREATE as typeof ActionTypes.TODO_CREATE,
  text,
});

const deleteTodo = (id: number) => ({
  type: ActionTypes.TODO_DELETE as typeof ActionTypes.TODO_DELETE,
  id,
});

const markTodoDone = (id: number) => ({
  type: ActionTypes.TODO_DONE as typeof ActionTypes.TODO_DONE,
  id,
});

function saveTodos(store: Store) {
  const { todos, saveId } = store.getState();
  if (saveId) {
    api.updateTodos(todos, saveId)
      .then(() => {
        store.dispatch(update_success());
      })
      .catch((err) => {
        store.dispatch(save_fail(err));
      });
  } else {
    api.saveTodos(todos)
      .then((id) => {
        store.dispatch(save_success(id));
      })
      .catch((err) => {
        store.dispatch(save_fail(err));
      });
    }

  return {
    type: ActionTypes.SAVING as typeof ActionTypes.SAVING,
  };
}

function save_success(id: string) {
  window.location.hash = id;
  return {
    type: ActionTypes.SAVE_SUCCESS as typeof ActionTypes.SAVE_SUCCESS,
    id,
  };
}

function update_success() {
  return {
    type: ActionTypes.SAVE_SUCCESS as typeof ActionTypes.UPDATE_SUCCESS,
  };
}

function save_fail(text: string) {
  return {
    type: ActionTypes.SAVE_FAIL as typeof ActionTypes.SAVE_FAIL,
    text,
  };
}

function loadTodos(store: Store, id: string) {
  api.loadTodos(id)
  .then((todos) => {
    store.dispatch(load_success(todos, id));
  })
  .catch((err) => {
    store.dispatch(save_fail(err));
  });

  return {
    type: ActionTypes.LOADING as typeof ActionTypes.LOADING,
  };
}

function load_success(todos: Todo[], id: string) {
  return {
    type: ActionTypes.LOAD_SUCCESS as typeof ActionTypes.LOAD_SUCCESS,
    todos,
    id,
  };
}

function load_fail(text: string) {
  return {
    type: ActionTypes.LOAD_FAIL as typeof ActionTypes.LOAD_FAIL,
    text,
  };
}

export const Actions = {
  createTodo,
  deleteTodo,
  markTodoDone,
  saveTodos,
  save_success,
  update_success,
  save_fail,
  loadTodos,
  load_success,
  load_fail,
};

export type Action = ReturnType<typeof Actions[keyof typeof Actions]>;
