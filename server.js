const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

var Helper = require('./Helper.js');

var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-2"});
var docClient = new AWS.DynamoDB.DocumentClient();

const rand = require('random-item');

app.use(express.static(__dirname + '/client/build'));

app.get("/", (req, res, next) => {
    res.sendFile("index.html", { root: '/client/build'})
});

// create a GET route
app.get('/3x3', (req, res) => {
    var equips = req.query.equips;
    Helper.get3x3(equips, function(arr){res.send(arr);});
});

app.get('/4x2', (req, res) => {
    var equips = req.query.equips;
    Helper.get4x2(equips, function(arr){res.send(arr);});
});

app.get('/5x2', (req, res) => {
    var equips = req.query.equips;
    Helper.get5x2(equips, function(arr){res.send(arr);});
});

app.get('/min', (req, res) => {
    Helper.getMin(function(arr){res.send(arr);});
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


