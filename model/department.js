// Imprt dependencies
const inquirer = require("inquirer");
const db = require("../connect.js");
const { NULL } = require("mysql/lib/protocol/constants/types.js");
require("console.table");

async function viewAllDepartments() {
  // sql prompt
  const sql = `SELECT * FROM departments`;
  // Return the data from the query
  return db
    .promise()
    .query(sql)
    // Deconstruct then cltable the results
    .then((results) => {
      console.log("\033[2J");
      console.table(results[0]);
      console.log("\n Press any key to continue \n");
    })
    .catch((err) => console.log(err));
}
async function viewTotalSalary() {
  const sql = `SELECT SUM(r.salary) AS total_salary, COUNT(e.id) AS total_employees
  FROM employees e
  JOIN roles r ON e.role_id = r.id;
  `;
  return db
    .promise()
    .query(sql)
    .then((results) => {
      console.log("\033[2J");
      console.table(results[0]);
      console.log("\n Press any key to continue \n");
    })
    .catch((err) => console.log(err));
}

const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Type the 'id' of the 'new' department",
        name: "id",
        validate: function (input) {
          const user_input = parseInt(input);
          const sql = "SELECT id FROM departments";
          // Using promise to control data flow
          return new Promise((resolve, reject) => {
            return db
              .promise()
              .query(sql)
              .then(([results]) => {
                const departmentIds = results.map((row) => row.id);
                const isInputValid = departmentIds.every(
                  (departmentId) => departmentId < user_input
                );
                if (isInputValid) {
                  resolve(true);
                } else {
                  reject(
                    "Please enter an ID greater than any current department ID."
                  );
                }
              })
              .catch((err) => {
                console.error("Error executing SQL query: ", err);
                reject(err);
              });
          });
        },
      },
      {
        type: "input",
        message: "Type the 'name' for the 'new' department",
        name: "title",
      },
    ])
    // Deconstruct
    .then(({ id, title }) => {
      const sql = `INSERT INTO departments (id, name) VALUES (?, ?)`;
      const values = [id, title];

      return db
        .promise()
        .query(sql, values)
        .then(() => {
          const selectSql = `SELECT * FROM departments`;
          return db.promise().query(selectSql);
        })
        .then(([results]) => {
          console.log("\033[2J");
          console.log("\n New department added into the database \n");
          console.table(results);
          console.log("\n Press any key to continue \n");
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
};

// Exporting all functions
module.exports = {
  viewAllDepartments,
  viewTotalSalary,
  addDepartment,
};
