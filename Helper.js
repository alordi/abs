var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-2"});
var docClient = new AWS.DynamoDB.DocumentClient();

const rand = require('random-item');

function filter_1(e) {
    return {
        TableName : "abs",
        FilterExpression: "Equipment IN (:e1, :e2, :e3, :e4, :e5, :e6, :e7, :e8, :e9)", 
        ExpressionAttributeValues: {
            ":e1": e[0],
            ":e2": e[1],
            ":e3": e[2],
            ":e4": e[3],
            ":e5": e[4],
            ":e6": e[5],
            ":e7": e[6],
            ":e8": e[7],
            ":e9": e[8],
        }
    };
}

function filter_2() {
    return {
        TableName : "abs",
        FilterExpression: "Equipment IN (:e1, :e2, :e3) AND Difficulty IN (:d1, :d2)", 
        ExpressionAttributeValues: {
            ":e1": "na",
            ":e2": "5 Ball",
            ":e3": "15 Ball",
            ":d1": "Easy",
            ":d2": "Medium"
        }
    };
}

function get3x3(equips, callback) {
    while (equips.length < 9){
        equips.push("na");
    }
    var arr = [];
    var params = filter_1(equips);
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log("Error");
        } else {
        console.log("Success");
        }

        var temp = data.Items.filter(function(d){
            return(d.Area == "Lower" && d.Difficulty == "Hard");
        });
        var x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Upper" && d.Difficulty == "Hard");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return((d.Area == "Both" || d.Area == "Obliques") && d.Difficulty == "Hard");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        var myJsonString = JSON.stringify(arr);
        callback(myJsonString);
    });
}

function get4x2(equips, callback) {
    while (equips.length < 9){
        equips.push("na");
    }
    var arr = [];
    var params = filter_1(equips);
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log("Error");
        } else {
        console.log("Success");
        }

        var temp = data.Items.filter(function(d){
            return(d.Area == "Lower");
        });
        var x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Upper");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Obliques");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Both" || d.Area == "Core");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        var myJsonString = JSON.stringify(arr);
        callback(myJsonString);
    });
}

function get5x2(equips, callback) {
    while (equips.length < 9){
        equips.push("na");
    }
    var arr = [];
    var params = filter_1(equips);
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log("Error");
        } else {
        console.log("Success");
        }

        var temp = data.Items.filter(function(d){
            return(d.Area == "Lower");
        });
        var x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Upper");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Obliques");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Both");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Core");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        var myJsonString = JSON.stringify(arr);
        callback(myJsonString);
    });
}

function getMin(callback) {
    var arr = [];
    var params = filter_2();
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log("Error");
        } else {
        console.log("Success");
        }

        var temp = data.Items.filter(function(d){
            return(d.Area == "Lower");
        });
        var x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Upper");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Obliques");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        temp = data.Items.filter(function(d){
            return(d.Area == "Both");
        });
        x = rand(temp);
        arr.push(x.Exercise);

        var myJsonString = JSON.stringify(arr);
        callback(myJsonString);
    });
}

module.exports = {
    filter_1, filter_2, get3x3, get4x2, get5x2, getMin
};