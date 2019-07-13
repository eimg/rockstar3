var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('todo', [ 'tasks' ]);

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/tasks', function(req, res) {
    db.tasks.find(function(err, data) {
        res.json(data);
    });
});

app.get('/tasks/:id', function(req, res) {
    var id = req.params.id;
    db.tasks.find({ '_id': mongojs.ObjectId(id) }, function(err, data) {
        res.json(data);
    });
});

// curl -X POST localhost:8000/tasks -d "subject=Subject"
app.post('/tasks', function(req, res) {
    var subject = req.body.subject;
    db.tasks.insert({
        subject: subject,
        status: 0
    }, function(err, data) {
        res.json(data);
    });
});

// curl -X PUT localhost:8000/tasks/[id] -d "status=1"
app.put('/tasks/:id', function(req, res) {
    var id = req.params.id;
    var status = parseInt(req.body.status);
    db.tasks.update(
        { '_id': mongojs.ObjectId(id) },
        { $set: { status: status } },
        { multi: false },
        function(err, data) {
            res.json(data);
        }
    );
});

app.delete('/tasks', function(req, res) {
    db.tasks.remove({ status: 1 }, function(err, data) {
        res.json(data);
    });
});

app.delete('/tasks/:id', function(req, res) {
    var id = req.params.id;

    db.tasks.remove({ _id: mongojs.ObjectId(id) }, function(err, data) {
        res.json(data);
    });
});

app.listen(8000, function() {
    console.log("API server running at port 8000");
});
