import { EventEmitter } from "events";


import dispatcher from "../dispatcher";
import TodoConstants from "../constants/todoConstants";

class TodoStore extends EventEmitter {

  constructor() {
    super();
    this.todos = [];
    this.selected = TodoConstants.SELECT_ALL;
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
    switch(this.selected) {
      case TodoConstants.SELECT_ACTIVE:
        return this.todos.filter((todo, id) => todo.done === false)
        break;
      case TodoConstants.SELECT_ALL:
        return this.todos
        break;
      case TodoConstants.SELECT_DONE:
        return this.todos.filter((todo, id) => todo.done === true)
        break;
    }
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
      case TodoConstants.SELECT_ACTIVE:
        this.selected = TodoConstants.SELECT_ACTIVE
        this.emit("change");
        break;
      case TodoConstants.SELECT_ALL:
        this.selected = TodoConstants.SELECT_ALL
        this.emit("change");
        break;
      case TodoConstants.SELECT_DONE:
        this.selected = TodoConstants.SELECT_DONE
        this.emit("change");
        break;
    }
  }

}

const todoStore = new TodoStore;

dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
