const inquirer = require("inquirer");
const db = require("./connect.js");
require("console.table");

// All helper functions to interact with SQL data
// three view functions performing SQL script
async function viewAllEmployees() {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.log("\033[2J");
      console.table(results);
      console.log("\n Press any key to continue \n");
    }
  });
}
async function viewAllRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.log("\033[2J");
      console.table(results);
      console.log("\n Press any key to continue \n");
    }
  });
}
async function viewAllDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.log("\033[2J");
      console.table(results);
      console.log("\n Press any key to continue \n");
    }
  });
}

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
          return isNaN(salary)
            ? "Please enter a valid number for the salary."
            : true;
        },
      },
      {
        type: "list",
        message: "Select the 'manager' for the 'new' employee",
        name: "manager",
        choices: [
          "John Doe",
          "Ash Rod",
          "Kun Singh",
          "Sarah Lourd",
          "No manager",
        ],
        filter: function (input) {
          return input === "No manager" ? null : input;
        },
      },
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
        const values2 = [
          firstName,
          lastName,
          roleTitle,
          department,
          salary,
          manager,
        ];

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
          const joinValues = [
            firstName,
            lastName,
            manager,
            roleTitle,
            department,
          ];

          db.query(sqlJoin, joinValues, (err, results) => {
            if (err) {
              console.log(err.message);
              return;
            }
            console.log("\033[2J");
            console.log(results);
            console.log("\n Press any key to continue");
            // console.table(results);
          });
        });
      });
    });
  // Exporting all functions
};
const addRole = () => {
  return inquirer
    .prompt([
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
          return isNaN(salary)
            ? "Please enter a valid number for the salary."
            : true;
        },
      },
    ])
    .then(({ roleTitle, department, salary }) => {
      const sql1 = `INSERT INTO roles (title, department, salary) VALUES (?, ?, ?)`;
      const values1 = [roleTitle, department, salary];

      db.query(sql1, values1, (err, results) => {
        if (err) {
          console.log(err.message);
          return;
        }

        const sql2 = `INSERT INTO employees (first_name, last_name, title, department, salary, manager) VALUES (?, ?, ?, ?, ?, ?)`;
        const values2 = [
          "no name",
          "no name",
          roleTitle,
          department,
          salary,
          "no manager",
        ];

        db.query(sql2, values2, (err, results) => {
          if (err) {
            console.log(err.message);
            return;
          }

          const sql = `SELECT * FROM roles`;
          db.query(sql, (err, results) => {
            if (err) {
              console.log(err.message);
              return;
            } else {
              console.log("\033[2J");
              console.table(results);
              console.log("\n Press any key to continue \n");
            }
          });
        });
      });
    });
};
const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Type the 'id ref num' for the 'new' department",
        name: "departmentID",
        validate: function (input) {
          const salary = parseFloat(input);
          return isNaN(salary)
            ? "Please enter a valid number for the id."
            : true;
        },
      },
      {
        type: "input",
        message: "Type the 'name' for the 'new' department",
        name: "departmentTitle",
      },
    ])
    .then(({ departmentID, departmentTitle }) => {
      const sql1 = `INSERT INTO departments (id, department) VALUES (?, ?)`;
      const values1 = [departmentID, departmentTitle];

      db.query(sql1, values1, (err, results) => {
        if (err) {
          console.log(err.message);
          return;
        }
        const sql = `SELECT * FROM departments`;
        db.query(sql, (err, results) => {
          if (err) {
            console.log(err.message);
            return;
          } else {
            console.log("\033[2J");
            console.table(results);
            console.log("\n Press any key to continue \n");
          }
        });
      });
    });
};

//Edit functions
async function editEmployee() {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: ", err);
      return;
    }
    // Extract the values from the result set and store them as choices
    const choices = results.map((row) => ({
      name: row.first_name + " " + row.last_name + " - " + row.title,
      value: row.id,
    }));
    inquirer.prompt([
      {
        type: "list",
        message: "\n Select the 'employee' you want to effect",
        // make sure to convert selected name into the appropriate id. maybe do above
        name: "id",
        choices: choices,
      }
    ]).then(({ id }) => {
      inquirer.prompt([
        {
          type: "list",
          message: "Would you like to ....",
          name: "editChoices",
          choices: [
            {
              name: "Delete Employee",
              value: "delete",
            },
            {
              name: "Update Employee",
              value: "update",
            },
          ]
        },
      ]).then(({ editChoices }) => {
        switch (editChoices) {
          case "delete":
            deleteEmployee(id)
              
            break;

          case "update":
            updateEmployee(id)
            
            break;
        }
      });
    });
  });
}


async function deleteEmployee(id) {
  console.log("deleting");
}

async function updateEmployee(id) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Type the 'first name' for the employee",
        name: "firstName",
      },
      {
        type: "input",
        message: "Type the 'last name' for the employee",
        name: "lastName",
      },
      {
        type: "input",
        message: "Type the 'title' for the employee",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "Type the 'department' for the employee",
        name: "department",
      },
      {
        type: "input",
        message: "Type the 'department' for the employee",
        name: "salary",
      },
      {
        type: "input",
        message: "Type the 'department' for the employee",
        name: "manager",
      },
    ])
    .then(({ firstName, lastName, roleTitle, department, salary, manager }) => {
      const sql1 = `UPDATE employees SET first_name = ?, last_name = ?, title = ?, department = ?, salary = ?, manager = ? WHERE id = ?`;
      const values1 = [firstName, lastName, roleTitle, department, salary, manager, id];

      db.query(sql1, values1, (err, results) => {
        if (err) {
          console.log(err.message);
          return;
        }
        console.log("\033[2J");
        console.table(results);
        console.log("\n Press any key to continue \n");
      });
    });
}

// Exporting all functions

module.exports = {
  viewAllEmployees,
  viewAllRoles,
  viewAllDepartments,
  addEmployee,
  addRole,
  addDepartment,
  editEmployee,
};
