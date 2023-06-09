
const mysql = require("mysql2/promise");


const helperConnection = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_tracker",
  }).then((db) => {
    console.log("Connected to MySQL");
    // console.log(db);
    return db;
  }).catch((error) => {
    console.error("Failed to connect to MySQL:", error);
    throw error;
  });
};

module.exports = {
  helperConnection,
};


