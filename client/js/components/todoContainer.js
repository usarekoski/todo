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
    this.tabs = ["Active", "Done", "All"];
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

  onTabClick(index) {
    switch(index) {
      case 0: TodoActions.selectAll();    break;
      case 1: TodoActions.selectDone();   break;
      case 2: TodoActions.selectActive(); break;
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
        <Tabs tabs = {this.tabs} onClick = {this.onTabClick} active = {active}/>
        <TodoForm />
        <TodoList todos = {todos} />
      </div>
    );
  }

}
