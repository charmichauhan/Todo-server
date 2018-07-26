var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var assert = require('assert');
var engines = require('consolidate');
var ejs = require('ejs');
var mongoose = require('mongoose');
var mongodb = require('mongodb');

var React = require('react');
var app = express();
require('babel-core/register');

var todoController = require('./controllers/server-controller');

// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', './index.html');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// var MongoClient = require('mongodb').MongoClient;
// var db;

// MongoClient.connect("mongodb://localhost:27017/todonew", function (err, database) {
//     console.log('connected')    
//     if (err) return console.error(err);
//     db = database;
// })

// MongoClient.connect("mongodb://localhost:27017/todonew", function (err, db) {
//     if (err) throw err;
//     var myobj = { todo: "charmi", date: "03/11/1995", completed: "false" };
//     db.collection("/todo").insert(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("1 record inserted");
//         db.close();
//     });
// });

// app.get("/todo", function (req, res, next) {
//     db.collection("todo").find({}, function (err, docs) {
//         if (err) return next(err);
//         docs.each(function (err, doc) {
//             if (doc) {
//                 console.log(doc);
//             }
//             else {
//                 res.end();
//             }
//         });
//     });
// });

//mongoose.connect('mongodb://charmic:lanetteam1@ds153853.mlab.com:53853/testdata');
const mongoUrl = "mongodb://localhost:27017/todoapp";
mongoose.connect(mongoUrl, (err) => {
    if (err) {
        console.log('Please make sure MongoDb is up and running');  
        throw error;
    }
    else {
        console.log('Database connected successfully...')
    }
});
var Todo = require('./models/user');

app.get('/todo', todoController.getTodos);
app.post('/todo', todoController.addTodo);
app.put('/todo/:id', todoController.updateTodo);
app.delete('/todo/:id', todoController.deleteTodo);
app.get('/todo/:id', todoController.addTodo);

// get an instance of express router
const router = express.Router();
router.route('/todo')
    .get(todoController.getTodos)
    .post(todoController.addTodo)
    .put(todoController.updateTodo);
router.route('/todo/:id')
    .get(todoController.getTodo)
    .delete(todoController.deleteTodo);

// app.get('/', routes.index);

//   app.post('/data', function(req, res) {
//     Todo.save(function(err,result) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(result);
//     });
// });

// //---------------get Books

// app.get('/data',function (req,res) {
//     Todo.find(function (err,test1) {
//         if(err)
//         {
//             throw err;
//         }
//         res.send(test1);
//     });
// });

// //------------------Delete Books

// app.delete('/data/:id',function (req,res) {
//     var query={_id:req.params.id};
//     Todo.remove(query,function (err,test1) {
//         if(err)
//         {
//             console.log("# API delete Error",err);
//         }
//         res.json(test1);
//     });
// });

// app.put('/data/:id',function (req, res) {
//     var test = req.body ;
//     var query = req.params.id;
//     var update = {
//         '$set':
//             {
//                 email: test.email,
//             }};
//     var options = {new : true};
//     Todo.findOneAndUpdate(query, update, options, function (err, test2) {
//         if(err){
//             throw err;
//         }
//         res.json(test2)
//     })
// });

// // catch 404 and forward to error handlers
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handlers

// // development error handler will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.listen(4000, function (err) {
    if (err) {
        return console.log('error::::', err);
    }
    console.log("API Server Is running on 4000");
});

module.exports = app;
