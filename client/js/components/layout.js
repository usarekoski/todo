import React from "react";

import Header from "./header";
import TodoContainer from "./todoContainer";

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <TodoContainer />
      </div>
    );
  }

}
