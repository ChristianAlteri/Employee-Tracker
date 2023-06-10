const inquirer = require("inquirer");
const db = require("./connect.js");
require("console.table");

// All helper functions to interact with SQL data
// three view functions performing SQL script
async function viewAllEmployees() {
  const sql = `SELECT * FROM employees`
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.log('\033[2J');
      console.table(results);
      console.log("\n Press any key to continue \n");
    }
  })
};
async function viewAllRoles() {
  const sql = `SELECT * FROM roles`
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.log('\033[2J');
      console.table(results);
      console.log("\n Press any key to continue \n");
    }
  })
};
async function viewAllDepartments() {
  const sql = `SELECT * FROM departments`
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.log('\033[2J');
      console.table(results);
      console.log("\n Press any key to continue \n");
    }
  })
};

// ADD functions
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
        validate: function (input) {
          const salary = parseFloat(input);
          return isNaN(salary) ? "Please enter a valid number for the salary." : true;
        }
      },
      {
        type: "list",
        message: "Select the 'manager' for the 'new' employee",
        name: "manager",
        choices: ["John Doe", "Ash Rod", "Kun Singh", "Sarah Lourd", "No manager"],
        filter: function (input) {
          return input === "No manager" ? null : input;
        }
      }
    ])
    .then(({ firstName, lastName, roleTitle, department, salary, manager }) => {
      
      const sql1 = `INSERT INTO roles (title, department, salary) VALUES (?, ?, ?)`;
      const values1 = [roleTitle, department, salary];
    
      db.query(sql1, values1, (err, results) => {
        if (err) {
          console.log(err.message);
          return;
        }
    
        const sql2 = `INSERT INTO employees (first_name, last_name, title, department, salary, manager) VALUES (?, ?, ?, ?, ?, ?)`;
        const values2 = [firstName, lastName, roleTitle, department, salary, manager];
    
        db.query(sql2, values2, (err, results) => {
          if (err) {
            console.log(err.message);
            return;
          }

        const sqlJoin = `
        SELECT ?, ?, roles.title, roles.department, roles.salary, ?
        FROM roles
        WHERE roles.title = ? AND roles.department = ?
      `;
      const joinValues = [firstName, lastName, manager, roleTitle, department];
    
        db.query(sqlJoin, joinValues, (err, results) => {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log('\033[2J');
          console.log(results);
          console.log("\n Press any key to continue");
          // console.table(results);
        });
      });
    });
  });
// Exporting all functions
}
module.exports = {
  viewAllEmployees, viewAllRoles, viewAllDepartments, addEmployee,
};
