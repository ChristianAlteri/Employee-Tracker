const inquirer = require("inquirer");
const db = require("../connect.js");
const { NULL } = require("mysql/lib/protocol/constants/types.js");
require("console.table");

async function viewAllRoles() {
  const sql = `SELECT * FROM roles`;
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
            return db
              .promise()
              .query(sql)
              .then(([results]) => {
                const roleIds = results.map((row) => row.id);
                const isInputValid = roleIds.every(
                  (roleId) => roleId < user_input
                );
                if (isInputValid) {
                  resolve(true);
                } else {
                  reject(
                    "Please enter an ID greater than any current role ID."
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
            db.promise()
              .query(sql)
              .then(([results]) => {
                const departmentChoices = results.map((row) => ({
                  name: row.name,
                  value: row.id,
                }));
                resolve(departmentChoices);
              })
              .catch((err) => {
                console.error("Error executing SQL query: ", err);
                reject(err);
              });
          });
        },
      },
    ])
    .then(({ id, title, department_id, salary }) => {
      const sql =
        "INSERT INTO roles (id, title, department_id, salary) VALUES (?, ?, ?, ?)";
      const values = [id, title, department_id, salary];

      return db.promise().query(sql, values);
    })
    .then(() => {
      const selectSql = `SELECT * FROM roles`;

      return db.promise().query(selectSql);
    })
    .then(([results]) => {
      console.log("\033[2J");
      console.log("\n New role added into the database \n");
      console.table(results);
      console.log("\n Press any key to continue \n");
    })
    .catch((err) => {
      console.log(err.message);
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
          // This clg just clears the terminal.
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
  viewAllRoles,
  addRole,
};
