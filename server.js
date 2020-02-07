const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


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
    var params = {
        TableName : "abs",
        FilterExpression: "Difficulty IN (:d1, :d2) and Area = :area", 
        ExpressionAttributeValues: {
            ":d1": "Hard",
            ":d2": "Medium",
            ":area": "Lower" 
        }
    };
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
        console.log("Success", data.Items);
        }
        var x = rand(data.Items);
        console.log(x);
        res.send(x);
    });
    
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


