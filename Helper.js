
function q_3x3_1(e) {
    return {
        TableName : "abs",
        FilterExpression: "Difficulty = :d1 and Area = :a1 and Equipment IN (:e1, :e2, :e3, :e4, :e5, :e6, :e7, :e8, :e9)", 
        ExpressionAttributeValues: {
            ":d1": "Hard",
            ":a1": "Lower",
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

function q_3x3_2(e) {
    return {
        TableName : "abs",
        FilterExpression: "Difficulty = :d1 and Area = :a1 and Equipment IN (:e1, :e2, :e3, :e4, :e5, :e6, :e7, :e8, :e9)", 
        ExpressionAttributeValues: {
            ":d1": "Hard",
            ":a1": "Upper",
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

function q_3x3_3(e) {
    return {
        TableName : "abs",
        FilterExpression: "Difficulty = :d1 and Area IN (:a1, :a2) and Equipment IN (:e1, :e2, :e3, :e4, :e5, :e6, :e7, :e8, :e9)", 
        ExpressionAttributeValues: {
            ":d1": "Hard",
            ":a1": "Obliques",
            ":a2": "Both",
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
    q_3x3_1, q_3x3_2, q_3x3_3
};