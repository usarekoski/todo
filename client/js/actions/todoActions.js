import dispatcher from "../dispatcher.js";
import TodoConstants from "../constants/todoConstants";
import TodoStore from "../stores/todoStore";

let nextTodoId = 0;

export function createTodo(text) {
  dispatcher.dispatch({
    id: nextTodoId++,
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

export function saveTodos(id) {
  let todos = TodoStore.getState().todos;
  var blob = new Blob([JSON.stringify(todos)], {type : 'application/json'});
  let init = {
    method: "POST",
    body: blob
  };
  let request = new Request("api/todos/add", init);

  fetch(request).then(function(response) {
    if (response.ok) {
      response.json().then(function(json) {
        if (json.id) {
          save_success(json.id);
        } else {
          save_fail(json.error);
        }
      });
    } else {
      save_fail("Connection failed.");
    }
  });

}

function save_success(id) {
  window.location.hash = id;
  dispatcher.dispatch({
    type: TodoConstants.SAVE_SUCCESS,
    id: id
  });
}

function save_fail(text) {
  dispatcher.dispatch({
    type: TodoConstants.SAVE_FAIL,
    text: text
  });
}


export function loadTodos(id) {
  let init = {
    method: "GET",
  };
  let request = new Request("api/todos/" + id, init);

  fetch(request).then(function(response) {
    if (response.ok) {
      response.json().then(function(json) {
        if (json.error) {
          load_fail(json.error);
        } else {
          console.log(json);
          load_success(json.todos, json.id);
        }
      });
    } else {
      load_fail("Connection failed.");
    }
  });

}

function load_success(todos, id) {

  dispatcher.dispatch({
    type: TodoConstants.LOAD_SUCCESS,
    todos: todos,
    id: id
  });
}

function load_fail(text) {
  dispatcher.dispatch({
    type: TodoConstants.LOAD_FAIL,
    text: text
  });
}
