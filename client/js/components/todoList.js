import React from "react";

import TodoStore from "../stores/todoStore";
import * as TodoActions from "../actions/todoActions";

import Todo from "./todo";

export default class TodoList extends React.Component {

  handleDeleteClick(id) {
    TodoActions.deleteTodo(id);
  }

  handleDoneClick(id) {
    TodoActions.markTodoDone(id);
  }

  render() {

    const { todos } = this.props;

    const todoComponents = Array.from(todos.entries(), value => {
      let todo = value[1];
      let id = value[0];
      return <Todo
          key = {id}
          text = {todo.text}
          done = {todo.done}
          onDoneClick = {this.handleDoneClick.bind(this, id)}
          onDeleteClick = {this.handleDeleteClick.bind(this, id)}
        />;
    });

    return (
      <div className="todoList">
        {todoComponents}
      </div>
    );
  }

}
