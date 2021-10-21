// required models
var topTenModel = require('../models/topTen')

const mysql = require('mysql2');
let con = mysql.createConnection({
    host: "localhost",
    user: "topTenUser",
    password: "letmein!",
    database: "topTenDb"
});

con.connect((err) => {
    if (err) throw err;

    console.log('Connected to the database!');
    let sql = "use topTenDb;";

    con.query(sql, (err) => {
        if (err) throw err;
    })
});


// Get top scores:
exports.getTopScores = function(req, res) {
    let scoresArr = [];
    let sql = "select * from scores;";
    con.query(sql, (err, rows, feilds) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {
            let myScore = topTenModel.createTen(rows[i].userName, rows[i].score, rows[i].date);
            scoresArr.push(myScore);
        }
        console.log(scoresArr);

        res.setHeader('Content-Type', 'application/json');
        res.send(scoresArr);
    })
    
}

// Save top Scores:
exports.saveTopScore = function(req, res) {
    let sql = "insert into scores (userName, score, date) "
        + "values ('"
            + req.body.userName + "', '"
            + parseInt(req.body.score) + "', '"
            + req.body.date 
        + "');";
    con.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    })
}
