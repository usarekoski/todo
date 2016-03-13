import React from "react";

import TodoStore from "../stores/todoStore";
import TodoConstants from "../constants/todoConstants";
import * as TodoActions from "../actions/todoActions";

import TodoList from "./todoList";
import TodoForm from "./todoForm";
import Tabs from "./tabs";


export default class TodoContainer extends React.Component {

  constructor() {
    super();
    this.state = {todos: TodoStore.getAll(), selected: TodoStore.selected};
    this.tabs = ["ACTIVE", "DONE", "ALL"];
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

  handleTabClick(index) {
    switch(index) {
      case 0: return TodoActions.selectActive; break;
      case 1: return TodoActions.selectDone;   break;
      case 2: return TodoActions.selectAll;    break;
    }
  }

  render() {

    const { todos, selected } = this.state;
    let active;

    switch(selected) {
      case TodoConstants.SELECT_ACTIVE: active = 0; break;
      case TodoConstants.SELECT_DONE:   active = 1; break;
      case TodoConstants.SELECT_ALL:    active = 2; break;
    }

    return (
      <div className = "todoContainer" >
        <Tabs
          tabs = {this.tabs}
          createOnClick = {this.handleTabClick}
          active = {active}
        />
        <TodoForm />
        <TodoList todos = {todos} />
      </div>
    );
  }

}
