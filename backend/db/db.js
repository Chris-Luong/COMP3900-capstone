const mysql = require("mysql");
const fs = require("fs");

const INIT_DB = fs.readFileSync("init_db.sql", "utf8").split(/;\r?\n/);
//const HOST = "127.0.0.1"
const HOST = "mysql";

// Create connection to MySQL
const db = mysql.createConnection({
  host: HOST,
  user: "root",
  password: "password",
  port: "3306",
});

// Connect
db.connect((err) => {
  if (err) console.error(err.message);
  else console.log("Database connected.");
});

// Create and initialise the database
for (let query of INIT_DB) {
  db.query(query.trim().replace(");\n", ")\n"), (err, results) => {
    if (err) {
      console.error("Error initialising database:", err);
      return;
    }
  });
}
console.log("Database initialised.");

module.exports = db;
