var express = require("express");
var mongoose = require("mongoose");
var TodoList = require("./todoListModel");

// Routes
var router = express.Router();

router.get("/:id", function(req, res) {
  TodoList.findById(req.params.id, function(err, todoList) {
    if (err) {
      console.log(err);
      res.json({error: "No save with this id."});
    } else {
      res.json(todoList);
    }
  });
});

router.post("/add", function(req, res) {
  var todoList = new TodoList();
  console.log(req.body);
  todoList.todos = req.body;
  todoList.save(function(err) {
    if (err) {
      console.log(err);
      res.json({error: "Saving to database failed."});
    } else {
      res.json({id: todoList.id});
    }
  });
});

module.exports = router;
