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
        // Perform logic to update the employee role
      });
})
}
module.exports = {
  viewAllEmployees,
  updateEmployee, viewAllRoles, viewAllDepartments, addEmployee,
};
