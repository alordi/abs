var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-2"});
var docClient = new AWS.DynamoDB.DocumentClient();

const rand = require('random-item');

function q_3x3(e) {
    return {
        TableName : "abs",
        FilterExpression: "Equipment IN (:e1, :e2, :e3, :e4, :e5, :e6, :e7, :e8, :e9)", 
        ExpressionAttributeValues: {
            ":e1": "na",
            ":e2": e[0],
            ":e3": e[1],
            ":e4": e[2],
            ":e5": e[3],
            ":e6": e[4],
            ":e7": e[5],
            ":e8": e[6],
            ":e9": e[7]
        }
    };
}

function get3x3(equips, callback) {
    while (equips.length < 8){
        equips.push("na");
    }
    var arr = [];
    var params = q_3x3(equips);
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
            return(d.Area == ("Both" || "Obliques") && d.Difficulty == "Hard");
        });
        x = rand(temp);
        arr.push(x.Exercise);
        console.log(arr);
        callback(arr);
    });
}

function sample(e) {
    return {
        TableName : "abs",
        FilterExpression: "Difficulty IN (:d1, :d2) and Area = :area and Equipment = :equip", 
        ExpressionAttributeValues: {
            ":d1": "Hard",
            ":d2": "Medium",
            ":area": "Lower",
            ":equip": e
        }
    };
}

module.exports = {
    q_3x3, get3x3
};