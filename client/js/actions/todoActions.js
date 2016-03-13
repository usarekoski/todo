import dispatcher from "../dispatcher.js";
import TodoConstants from "../constants/todoConstants";
import TodoStore from "../stores/todoStore";

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
