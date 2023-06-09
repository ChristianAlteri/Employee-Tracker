// Import dependencies
const cTable = require("console.table");
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
// Load helper functions
const {
  viewAllEmployees,
  addEmployee,
  editEmployee,
} = require("./model/employee.js");
const {
  viewAllDepartments,
  viewTotalSalary,
  addDepartment,
} = require("./model/department.js");
const { viewAllRoles, addRole } = require("./model/roles.js");
// Connect to database
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
// Begin the main prompts
async function start() {
  // Initialise main so we can pass it along the switch chain
  const { main } = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "main",
      choices: [
        "View all Employees",
        "Add Employee",
        "Edit Employee",
        "View all Roles",
        "Add Role",
        "View all Departments",
        "Add Department",
        "View Total of Salary",
        "Quit",
      ],
    },
  ]);
  // Using switch() instead of if "view all ...." ==== "view all ...."
  switch (main) {
    case "View all Employees":
      // Call the helper function then call start to re prompt main menu. (Same structure for all questions)
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
    case "Edit Employee":
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

    case "Add Department":
      addDepartment()
        .then(() => {
          start();
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
}
// Funcs defined
ASCII();
start();
