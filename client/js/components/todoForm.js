import React from "react";

import * as TodoActions from "../actions/todoActions";

export default class TodoForm extends React.Component {

  constructor() {
    super();
    this.state = {text: ""};
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    TodoActions.createTodo(this.state.text);
    this.setState({text: ""});
  }

  render() {
    return (
      <form id="todoForm" onSubmit={this.handleSubmit.bind(this)}>
        <i className = "fa fa-chevron-right"></i>
        <input
          id="name"
          type="text"
          placeholder="Do stuff"
          value={this.state.text}
          onChange={this.handleTextChange.bind(this)}
         />
      </form>
    );
  }

}
