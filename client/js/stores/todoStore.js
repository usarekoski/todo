import { EventEmitter } from "events";


import dispatcher from "../dispatcher";
import TodoConstants from "../constants/todoConstants";

class TodoStore extends EventEmitter {

  constructor() {
    super();
    this.todos = [];
  }

  createTodo(text) {
    this.todos.push({
      "text": text,
      "done": false
    });
    this.emit("change");
  };

  deleteTodo(id) {
    this.todos.splice(id, 1);
    this.emit("change");
  };

  markTodoDone(id) {
    let todo = this.todos[id];
    todo.done = !todo.done;
    this.todos[id] = todo;
    this.emit("change");
  };

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    switch(action.type) {
      case TodoConstants.TODO_CREATE:
        this.createTodo(action.text);
        break;
      case TodoConstants.TODO_DELETE:
        this.deleteTodo(action.id);
        break;
      case TodoConstants.TODO_DONE:
        this.markTodoDone(action.id);
        break;
    }
  }

}

const todoStore = new TodoStore;

dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
