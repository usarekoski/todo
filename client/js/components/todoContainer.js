import React from "react";

import TodoStore from "../stores/todoStore";
import * as TodoActions from "../actions/todoActions";

import TodoList from "./todoList";

export default class TodoContainer extends React.Component {

  constructor() {
    super();
    this.state = {todos: TodoStore.getAll(), selected: TodoStore.selected}
  }

  getTodos() {
    this.setState({todos: TodoStore.getAll(), selected: TodoStore.selected});
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos.bind(this));
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos.bind(this));
  }

  render() {

    const { todos } = this.state;

    return (
      <div className="todoContainer">
        <TodoList todos={todos} />
      </div>
    );
  }

}
