const inquirer = require("inquirer");
const db = require("./connect.js");
const { NULL } = require("mysql/lib/protocol/constants/types.js");
require("console.table");

// All helper functions to interact with SQL data
// four view functions performing SQL script
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
async function viewTotalSalary() {
  const sql = `SELECT SUM(r.salary) AS total_salary, COUNT(e.id) AS total_employees
  FROM employees e
  JOIN roles r ON e.role_id = r.id;
  `;
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
        message: "Type the 'id' of the 'new' employee",
        name: "id",
        validate: function (input) {
          const user_input = parseInt(input);
          const sql = "SELECT id FROM employees";
          return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
              if (err) {
                console.error("Error executing SQL query: ", err);
                reject(err);
              }
              const employeeIds = results.map((row) => row.id);
              // .every is an array method checking every element in the array
              const isInputValid = employeeIds.every(
                (employeeId) => employeeId < user_input
              );
              if (isInputValid) {
                resolve(true);
              } else {
                reject(
                  "Please enter an ID greater than any current employee ID."
                );
              }
            });
          });
        },
      },
      {
        type: "input",
        message: "Type the 'title' for the 'new' role",
        name: "title",
      },
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
        message: "Is the 'role' id the same as the 'id'?",
        name: "roleID",
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      },
      {
        type: "list",
        message: "Select the 'manager' for the 'new' employee",
        name: "manager_id",
        choices: [
          { name: "John Doe", value: 1 },
          { name: "Ash Rod", value: 3 },
          { name: "Kun Singh", value: 5 },
          { name: "Sarah Lourd", value: 7 },
          { name: "No Manager", value: null },
        ],
      },
      {
        type: "list",
        message: "Select the 'department' for the 'new' role",
        name: "department_id",
        choices: function () {
          return new Promise((resolve, reject) => {
            const sql = "SELECT id, name FROM departments";
            db.query(sql, (err, results) => {
              if (err) {
                console.error("Error executing SQL query: ", err);
                reject(err);
              }
              const departmentChoices = results.map((row) => ({
                name: row.name,
                value: row.id,
              }));
              resolve(departmentChoices);
            });
          });
        },
      },
    ])
    .then(
      ({
        id,
        firstName,
        lastName,
        title,
        department_id,
        salary,
        roleID,
        manager_id,
      }) => {
        const roleIdValue = roleID ? id : id;
        const sql1 = `INSERT INTO roles (id, title, salary, department_id) VALUES (?, ?, ?, ?)`;
        const values1 = [id, title, salary, department_id];
        // let role_id = id
        db.query(sql1, values1, (err, results) => {
          if (err) {
            console.log(err.message);
            return;
          }

          const sql2 = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)`;
          const values2 = [id, firstName, lastName, roleIdValue, manager_id];
          // Return the employee table to show user update.
          db.query(sql2, values2, (err, results) => {
            if (err) {
              console.log(err.message);
              return;
            }
            const sql = `SELECT * FROM employees`;
            db.query(sql, (err, results) => {
              if (err) {
                console.log(err.message);
                return;
              } else {
                console.log("\033[2J");
                console.log("\n New employee added into database \n\n");
                console.table(results);
                console.log("\n Press any key to continue \n");
              }
            });
          });
        });
      }
    );
};
const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Type the 'id' of the 'new' role",
        name: "id",
        validate: function (input) {
          const user_input = parseInt(input);
          const sql = "SELECT id FROM roles";
          return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
              if (err) {
                console.error("Error executing SQL query: ", err);
                reject(err);
              }
              const roleIds = results.map((row) => row.id);
              const isInputValid = roleIds.every((roleId) => roleId < user_input);
              if (isInputValid) {
                resolve(true);
              } else {
                reject("Please enter an ID greater than any current role ID.");
              }
            });
          });
        },
      },
      {
        type: "input",
        message: "Type the 'title' for the 'new' role",
        name: "title",
      },
      {
        type: "input",
        message: "Type the 'salary' for the 'new' role",
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
        message: "Select the 'department' for the 'new' role",
        name: "department_id",
        choices: function () {
          return new Promise((resolve, reject) => {
            const sql = "SELECT id, name FROM departments";
            db.query(sql, (err, results) => {
              if (err) {
                console.error("Error executing SQL query: ", err);
                reject(err);
              }
              const departmentChoices = results.map((row) => ({
                name: row.name,
                value: row.id,
              }));
              resolve(departmentChoices);
            });
          });
        },
      },
    ])
    .then(({ id, title, department_id, salary }) => {
      const sql = 'INSERT INTO roles (id, title, department_id, salary) VALUES (?, ?, ?, ?)';
      const values = [id, title, department_id, salary];
      db.query(sql, values, (err, results) => {
        if (err) {
          console.log(err.message);
          return;
        }
        const selectSql = `SELECT * FROM roles`;
        db.query(selectSql, (err, results) => {
          if (err) {
            console.log(err.message);
            return;
          } else {
            console.log("\033[2J");
            console.log("\n New role added into the database \n");
            console.table(results);
            console.log("\n Press any key to continue \n");
          }
        });
      });
    });
};
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
          return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
              if (err) {
                console.error("Error executing SQL query: ", err);
                reject(err);
              }
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
    .then(({ id, title }) => {
      const sql = `INSERT INTO departments (id, name) VALUES (?, ?)`;
      const values = [id, title];
      db.query(sql, values, (err, results) => {
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
            console.log("\n New department added into database \n\n");
            console.table(results);
            console.log("\n Press any key to continue \n");
          }
        });
      });
    });
};

// Edit function
function editEmployee() {
  inquirer
    .prompt([
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
        ],
      },
    ])
    .then(({ editChoices }) => {
      switch (editChoices) {
        case "delete":
          inquirer
            .prompt([
              {
                type: "list",
                message: "\n Select the 'employee' you want to delete",
                name: "id",
                choices: function () {
                  return new Promise((resolve, reject) => {
                    const sql = "SELECT * FROM employees";
                    db.query(sql, (err, results) => {
                      if (err) {
                        console.error("Error executing SQL query: ", err);
                        reject(err);
                      }
                      const employeeChoices = results.map((row) => ({
                        name: row.first_name + " " + row.last_name,
                        value: row.id,
                      }));
                      resolve(employeeChoices);
                    });
                  });
                },
              }])
              .then(({ id }) => {
                const sql = `DELETE from employees WHERE id = ?`;
                const values = [ id ];
  
                db.query(sql, values, (err, results) => {
                  if (err) {
                    console.log(err.message);
                    return;
                  }
                  console.log("\033[2J");
                  console.table(results);
                  console.log('\nSuccusfully deleted\n');
                  console.log("\n Press any key to continue \n");
                });
              });
          break;

        case "update":
          inquirer
            .prompt([
              {
                type: "list",
                message: "\n Select the 'employee' you want to update",
                name: "id",
                choices: function () {
                  return new Promise((resolve, reject) => {
                    const sql = "SELECT * FROM employees";
                    db.query(sql, (err, results) => {
                      if (err) {
                        console.error("Error executing SQL query: ", err);
                        reject(err);
                      }
                      const employeeChoices = results.map((row) => ({
                        name: row.first_name + " " + row.last_name,
                        value: row.id,
                      }));
                      resolve(employeeChoices);
                    });
                  });
                },
              },
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
                type: "list",
                message: "Select the 'role' for the updated employee",
                name: "role_id",
                choices: function () {
                  return new Promise((resolve, reject) => {
                    const sql = "SELECT id, title FROM roles";
                    db.query(sql, (err, results) => {
                      if (err) {
                        console.error("Error executing SQL query: ", err);
                        reject(err);
                      }
                      const rolesChoices = results.map((row) => ({
                        name: row.title,
                        value: row.id,
                      }));
                      resolve(rolesChoices);
                    });
                  });
                },
              },
              {
                type: "list",
                message: "Select the 'manager' for the 'new' employee",
                name: "manager_id",
                choices: [
                  { name: "John Doe", value: 1 },
                  { name: "Ash Rod", value: 3 },
                  { name: "Kun Singh", value: 5 },
                  { name: "Sarah Lourd", value: 7 },
                  { name: "No Manager", value: null },
                ],
              },
            ])
            .then(({ id, firstName, lastName, role_id, manager_id }) => {
              const sql = `UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`;
              const values = [firstName, lastName, role_id, manager_id, id];

              db.query(sql, values, (err, results) => {
                if (err) {
                  console.log(err.message);
                  return;
                }
                console.log("\033[2J");
                console.table(results);
                console.log('\nSuccusfully updated\n');
                console.log("\n Press any key to continue \n");
              });
            });
          break;
      }
    });
}



// Exporting all functions

module.exports = {
  viewAllEmployees,
  viewAllRoles,
  viewAllDepartments,
  viewTotalSalary,
  addEmployee, addRole, addDepartment, editEmployee,
};




// {
//   type: "list",
//   message: "Select the 'department' for the 'new' employee",
//   name: "department_id",
//   choices: [
//     { name: "Sales", value: 1 },
//     { name: "Engineering", value: 2 },
//     { name: "Finance", value: 3 },
//     { name: "Legal", value: 4 },
//   ],
// },