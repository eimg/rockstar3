var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('todo', [ 'tasks' ]);

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var { check, validationResult } = require('express-validator');

var md5 = require('md5');
var jwt = require('jsonwebtoken');
var app_key = 'secret';

app.get('/login', [
    check('email').isEmail(),
    check('password').isLength(3)
], function(req, res) {

    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }

    db.users.find({
        email: req.body.email,
        password: md5(req.body.password)
    }, function(err, data) {
        if(data.length) {
            var token = jwt.sign(data[0], app_key);
            return res.json({ token: token });
        }
        return res.status(403).json({msg: 'invalide email/password'});
    });
});

app.get('/tasks', function(req, res) {
    var token = req.query.token;
    if(!token) {
        return res.status(403).json({ msg: 'empty token' });
    }

    jwt.verify(token, app_key, function(err, user) {
        if(err) {
            res.status(403).json({msg: 'invalid token'})
        } else {
            db.tasks.find(function(err, data) {
                res.json(data);
            });
        }
    });
});

app.get('/tasks/:id', function(req, res) {
    var id = req.params.id;
    db.tasks.find({ '_id': mongojs.ObjectId(id) }, function(err, data) {
        res.json(data);
    });
});

// curl -X POST localhost:8000/tasks -d "subject=Subject"
app.post('/tasks', [
    check('subject').not().isEmpty()
], function(req, res) {
    var subject = req.body.subject;

    var errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }

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
