var mongoose = require("mongoose");

var todoListSchema = mongoose.Schema({
  todos: [{ name: String, done: Boolean }]
});

module.exports = mongoose.model("TodoList", todoListSchema);
