const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

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
    console.log(req.query);
    var equips = req.query.equips;
    console.log(equips);
    Helper.get3x3(equips, function(arr){res.send(arr);});
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


