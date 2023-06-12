// Import dependencies
const cTable = require("console.table");
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const {
  viewAllEmployees,
  viewAllRoles,
  viewAllDepartments, viewTotalSalary, addEmployee,
} = require("./helper.js");
const db = require("./connect.js");

// Render title
ASCII = () => {
  console.log(
    "       *    (   (       )     )                 (                      )     (     "
  );
  console.log(
    "     (  `   )\\ ))\\ ) ( /(  ( /(            *   ))\\ )   (       (    ( /(     )\\ )  "
  );
  console.log(
    " (   )\\))( (()/(()/( )\\()) )\\())(   (    ` )  /(()/(   )\\      )\\   )\\())(  (()/(  "
  );
  console.log(
    " )\\ ((_)()\\ /(_))(_)|(_\\ ((_) )\\  )\\    ( )(_))(_)|(((_)(  (((_)|((_) )\\  /(_)) "
  );
  console.log(
    "((_)(_()((_|_))(_))   ((_)_ ((_|(_)((_)  (_(_()|_))  )\\ _ )\\ )\\___|_ ((_|(_)(_))   "
  );
  console.log(
    "| __|  \\/  | _ \\ |   / _ \\ \\ / / __| __| |_   _| _ \\ (_)_\\(_|(/ __| |/ /| __| _ \\ "
  );
  console.log(
    "| _|| |\\/| |  _/ |__| (_) \\ V /| _|| _|    | | |   /  / _ \\  | (__  ' < | _||   / "
  );
  console.log(
    "|___|_|  |_|_| |____|\\___/ |_| |___|___|   |_| |_|_\\ /_/ \\_\\  \\___|_|\\_\\|___|_|_\\"
  );
  console.log(
    "......................................................................................."
  );
};

async function start() {
  const { main } = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "main",
      choices: [
        "View all Employees",
        "Add Employee",
        "Edit Employee Role",
        "View all Roles",
        "Add Role",
        "View all Departments",
        "Add Departments",
        "View Total of Salary",
        "Quit",
      ],
    },
  ]);

  switch (main) {
    case "View all Employees":
      viewAllEmployees()
        .then(() => {
          start();
        })
        .catch((err) => {
          console.error(err);
        });
      break;

    case "Add Employee":
      addEmployee()
      .then(() => {
        start();
      })
      .catch((err) => {
        console.error(err);
      });
      break;
    case "Edit Employee Role":
      editEmployee()
      .then(() => {
        start();
      })
      .catch((err) => {
        console.error(err);
      });
      break;
    case "View all Roles":
      viewAllRoles()
        .then(() => {
          start();
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    case "Add Role":
      addRole()
        .then(() => {
          start();
        })
        .catch((err) => {
          console.error(err);
        });
      break;

    case "View all Departments":
      viewAllDepartments()
        .then(() => {
          start();
        })
        .catch((err) => {
          console.error(err);
        });
      break;

    case "Add departments":
      addDepartment()
        .then(() => {
          // start();
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    case "View Total of Salary":
      viewTotalSalary()
        .then(() => {
          start();
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    case "Quit":
      console.log("\033[2J");
      console.log("Thank you for using the Employee Tracker");
      break;
  }

  // You can access the selected option as 'main' variable here
  // Perform further actions based on the selected option
}
ASCII();
start();
