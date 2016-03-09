import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/layout";

import "../css/normalize.scss";
import "../css/app.scss";

const App = document.getElementById("app");

ReactDOM.render(
  <Layout />,
  App
);
