var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var todoListController = require("./server/todoListController");

var app = express();
var PORT = process.env.PORT || 8080;
var DEV = process.env.NODE_ENV || 'dev';
var MONGO_URL = process.env.MONGO_URL || "mongodb://localhost";

// Connect to DB
mongoose.connect(MONGO_URL);

app.use(bodyParser.json()); // for parsing application/json

// register Routes
app.use("/api/todos", todoListController);

// Serve static files in public directory
if (DEV === "dev") {
  // Use webpack-dev-server in development and proxy api requests.
  var webpack = require("webpack");
  var webpackDevServer = require("webpack-dev-server");
  var url = require("url");

  var config = require("./webpack.config.js");
  config.entry.app.unshift("webpack-dev-server/client?http://localhost:8000/", "webpack/hot/dev-server");

  // Webpack-dev-server on port 8000 with automatic reloading.
  var compiler = webpack(config);
  var server = new webpackDevServer(compiler, {
    contentBase: "./public",
    hot: true,
    debug: true,
    colors: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:8080"
      }
    }
  });

  server.listen(8000, function() {
    console.log("Started webpack-dev-server on port: 8000");
  });
} else {
  // In production serve static files normally.
  app.use(express.static('public'));
}

// start the server
app.listen(PORT, function() {
  console.log("Started server on port: " + PORT);
});
