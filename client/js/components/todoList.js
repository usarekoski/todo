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

    const todoComponents = todos.map(todo => {
      return <Todo
          key = {todo.id}
          text = {todo.text}
          done = {todo.done}
          onDoneClick = {this.handleDoneClick.bind(this, todo.id)}
          onDeleteClick = {this.handleDeleteClick.bind(this, todo.id)}
        />;
    });

    return (
      <div className="todoList">
        {todoComponents}
      </div>
    );
  }

}
