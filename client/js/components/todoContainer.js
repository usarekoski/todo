import React from "react";
import {Container} from 'flux/utils';

import TodoStore from "../stores/todoStore";
import TodoConstants from "../constants/todoConstants";
import * as TodoActions from "../actions/todoActions";

import TodoList from "./todoList";
import TodoForm from "./todoForm";
import Tabs from "./tabs";
import SaveTodos from "./saveTodos";


export default class TodoContainer extends React.Component {

  constructor() {
    super();
    this.tabs = ["ACTIVE", "DONE", "ALL"];
    this.state = {todos: [], selected: 2};
  }

  getTodos() {
    this.setState({todos: TodoStore.getAll()});
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos.bind(this));
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos.bind(this));
  }

  handleTabClick(index) {
    return (function() {
      this.setState({selected: index});
    }).bind(this)
  }

  render() {

    const { todos, selected } = this.state;

    const filteredTodos = todos.filter((todo, id) => {
      switch(selected) {
        case 0: return todo.done === false; // Active
        case 1: return todo.done === true; // Done
        case 2: return true; // All
      }
    });

    return (
      <div className = "todoContainer" >
        <SaveTodos />
        <Tabs
          tabs = {this.tabs}
          createOnClick = {this.handleTabClick.bind(this)}
          active = {selected}
        />
        <TodoForm />
        <TodoList todos = {filteredTodos} />
      </div>
    );
  }

}
