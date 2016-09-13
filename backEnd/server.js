var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var Message = mongoose.model('message', {
    msg: String
});

//Middleware
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next(); //since this is a custom middleware next() is requried so make sure it does not freeze the chain
});

app.get('/api/message/',  getMesages);

app.post('/api/message/', function(req,res){
    console.log(req.body);
    var message = new Message(req.body);
    message.save();
    res.status(200);
});

mongoose.connect("mongodb://localhost:27017/test", function(err, db){
    if(!err){
        console.log('We are connected to the mongo database');
    }
});

var server = app.listen(5000, function(){
    console.log('Listening on Port', server.address().port);
});

function getMesages(req, res){
    Message.find({}).exec(function(err, result){
        res.send(result);
    })
}
