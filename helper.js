const inquirer = require("inquirer");
const db = require("./connect.js");
require("console.table");

// All helper functions to interact with SQL data
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
const viewAllRoles = () => {
  const sql = `SELECT * FROM roles`
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.table(results);
    }
  })
};
const viewAllDepartments = () => {
  const sql = `SELECT * FROM departments`
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.table(results);
    }
  })
};

const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Type the 'first' name of the 'new' employee",
        name: "firstName",
      },
      {
        type: "input",
        message: "Type the 'last' name of the 'new' employee",
        name: "lastName",
      },
      {
        type: "input",
        message: "Type the 'role' for the 'new' employee",
        name: "roleTitle",
      },
      {
        type: "list",
        message: "Select the 'department' for the 'new' employee",
        name: "department",
        choices: ["Sales", "Engineering", "Finance", "Legal"],
      },
      {
        type: "input",
        message: "Type the 'salary' for the 'new' employee",
        name: "salary",
      },
      {
        type: "list",
        message: "Select the 'manager' for the 'new' employee",
        name: "manager",
        choices: ["John Doe", "Ash Rod", "Kun Singh", "Sarah Lourd", "No manager"],
      },
    ])
    .then(({ firstName, lastName, roleTitle, department, salary, manager }) => {
      const sql = `INSERT INTO employees (first_name, last_name, title, department, salary, manager) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [firstName, lastName, roleTitle, department, salary, manager];

      db.query(sql, values, (err, results) => {
        if (err) {
        console.log(err.message);
        return;
      } else {
        console.table(results);
      }
      });
})

// Exporting all functions
}
module.exports = {
  viewAllEmployees, viewAllRoles, viewAllDepartments, addEmployee,
};
