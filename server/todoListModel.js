var mongoose = require("mongoose");

var todoListSchema = mongoose.Schema({
  todos: [{ id: Number, text: String, done: Boolean }]
});

module.exports = mongoose.model("TodoList", todoListSchema);
