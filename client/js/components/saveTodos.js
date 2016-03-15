import React from "react";

import * as TodoActions from "../actions/todoActions";

export default class SaveTodos extends React.Component {

  constructor() {
    super();
  }

  handleSaveClick() {
    TodoActions.saveTodos();
  }

  render() {
    return (
      <div className="saveTodos">
        <a onClick={this.handleSaveClick.bind(this)}>Save</a>
        {this.props.saveId}
      </div>
    );
  }

}
