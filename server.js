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
    var equips = ["Bar", "5 Ball"];
    while (equips.length < 8){
        equips.push("na");
    }
    var arr = [];
    var params = Helper.q_3x3_1(equips);
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log("Error");
        } else {
        console.log("Success");
        }
        var x = rand(data.Items);
        arr.push(x.Exercise)
    });
    var params2 = Helper.q_3x3_2(equips);
    docClient.scan(params2, function(err, data) {
        if (err) {
            console.log("Error");
        } else {
        console.log("Success");
        }
        var x = rand(data.Items);
        arr.push(x.Exercise);
    });
    var params3 = Helper.q_3x3_3(equips);
    docClient.scan(params3, function(err, data) {
        if (err) {
            console.log("Error");
        } else {
        console.log("Success");
        }
        var x = rand(data.Items);
        arr.push(x.Exercise)
        console.log(arr);
        res.send(arr);
    });
    
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


