var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    id: String,
    todo: String,
    date: Date,
    completed: Boolean

});

var Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
