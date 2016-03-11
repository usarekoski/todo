import React from "react";
import classNames from "classnames";

export default class Todo extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    const { text, done, onDoneClick, onDeleteClick } = this.props;
    let classes = classNames({
      'todo': true,
      'done': done
    });

    return (
      <div className={classes}>
        <label>
          <input
            type="checkbox"
            onChange={onDoneClick}
            checked={done}
          />
          {text}
        </label>
        <a className="remove" onClick = {onDeleteClick}>
          <i className = "fa fa-times"></i>
        </a>
      </div>
    );
  }

}
