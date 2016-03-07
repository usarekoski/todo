var express = require("express");3
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var todoListController = require("./server/todoListController");

var app = express();
var PORT = process.env.PORT || 8080;

// Connect to DB
mongoose.connect('mongodb://localhost');

app.use(bodyParser.json()); // for parsing application/json

// register Routes
app.use("/api/todos", todoListController);
// Serve files in public directory
app.use(express.static('public'));

// start the server
app.listen(PORT, function() {
  console.log("Started server on port: " + PORT);
});
