const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
let helper;

function helperConnection() {
  return mysql
    .createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "employee_tracker",
    })
    .then((db) => {
      helper = {
        updateEmployee: () => {
          return inquirer
            .prompt([
              {
                type: "input",
                message: "Which employee would you like to update?",
                name: "employee",
              },
              {
                type: "input",
                message: "What is the new title of the role?",
                name: "roleTitle",
              },
            ])
            .then(({ employee, roleTitle }) => {
              console.log("Employee:", employee);
              console.log("Role Title:", roleTitle);
              // Perform logic to update the employee role
            });
        },

        viewAllEmployees: () => {
          return db
            .execute("SELECT * FROM employees")
            .then(([allEmployees]) => {
              console.table(allEmployees);
            });
        },
      };
    });
}

module.exports = {
  helper,
  helperConnection,
};

