import React from "react";

import * as TodoActions from "../actions/todoActions";

export default class SaveTodos extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="saveTodos">
        <a>Save</a>
      </div>
    );
  }

}
