
const mysql = require("mysql2");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_tracker",
  });

  db.connect(function (err) {
    if (err) throw err;
  })

module.exports = db


