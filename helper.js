const inquirer = require("inquirer");
const db = require("./connect.js");
const { start } = require("repl");
require("console.table");


const updateEmployee = () => {
  return inquirer
    .prompt([
      // {
      //   type: "rawlist",
      //   message: "Which employee would you like to update?",
      //   name: "employee",
      //   choices: [

      //   ]
      // },
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
};

const viewAllEmployees = () => {
  const sql = `SELECT * FROM employees`
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.table(results);
      
    }
  })
};

module.exports = {
  viewAllEmployees,
  updateEmployee,
};
