import React from "react";
import classNames from "classnames";


export default class Tabs extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    const { active, tabs, onClick } = this.props;

    const tabComponents = tabs.map( (text, index) => {
      return <li
        key = {index}
        onClick = {onClick}
        className = {classNames({"active": index === active})} >
        {text}
      </li>
    });

    return (
      <div className="tabs">
        <ul>
          {tabComponents}
        </ul>
      </div>
    );
  }

}
