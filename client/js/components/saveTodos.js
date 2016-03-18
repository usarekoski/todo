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
        <a className="save" onClick={this.handleSaveClick.bind(this)}>SAVE</a>
        <div className="info">
          <p className="status">Status: {this.props.saveStatus}</p>
          <p className="url">{this.props.saveURL}</p>
        </div>
      </div>
    );
  }

}
