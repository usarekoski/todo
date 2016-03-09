var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var todoListController = require("./server/todoListController");

var app = express();
var PORT = process.env.PORT || 8080;
var DEV = process.env.NODE_ENV || 'dev';

// Connect to DB
mongoose.connect('mongodb://localhost');

app.use(bodyParser.json()); // for parsing application/json

// register Routes
app.use("/api/todos", todoListController);
// Serve static files in public directory
// Use webpack-dev-server in development
if (DEV === "dev") {
  var webpack = require("webpack");
  var webpackDevServer = require("webpack-dev-server");
  var url = require("url");
  var proxy = require('proxy-middleware');

  var config = require("./webpack.config.js");
  config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

  // Webpack-dev-server on port 8000 with automatic reloading.
  var compiler = webpack(config);
  app.use('/', proxy(url.parse('http://localhost:8000/')));
  var server = new webpackDevServer(compiler, {contentBase: "./public"});
  server.listen(8000);
} else {
  // In production serve static files normally.
  app.use(express.static('public'));
}

// start the server
app.listen(PORT, function() {
  console.log("Started server on port: " + PORT);
});
