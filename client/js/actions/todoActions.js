import dispatcher from "../dispatcher.js";
import TodoConstants from "../constants/todoConstants";

export function createTodo(text) {
  dispatcher.dispatch({
    type: TodoConstants.TODO_CREATE,
    text: text
  });
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: TodoConstants.TODO_DELETE,
    id: id
  });
}

export function markTodoDone(id) {
  dispatcher.dispatch({
    type: TodoConstants.TODO_DONE,
    id: id
  });
}

export function selectAll() {
  dispatcher.dispatch({
    type: TodoConstants.SELECT_ALL,
  });
}

export function selectDone() {
  dispatcher.dispatch({
    type: TodoConstants.SELECT_DONE,
  });
}

export function selectActive() {
  dispatcher.dispatch({
    type: TodoConstants.SELECT_ACTIVE,
  });
}
