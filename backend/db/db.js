const mysql = require('mysql');

const DB_NAME = "queuequicker"

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database: DB_NAME,
})


db.connect((err) => {
    if (err) logger.error(err.message);
    else console.log("database connected")
});

module.exports = db;