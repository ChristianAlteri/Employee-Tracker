// Import dependencies
const mysql = require("mysql2");

// Create connection to DB
const db = mysql.createConnection({
    host: "localhost",
    user:   'root',
    password: 'password',
    database: 'employee_db',
  });

  db.connect(function (err) {
    if (err) throw err;
  })
// export db to use i query prompts
module.exports = db






  