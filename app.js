// Import dependencies
const cTable = require("console.table");
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const { viewAllEmployees, viewAllRoles, viewAllDepartments, addEmployee } = require("./helper.js");
const db = require("./connect.js");
// const readline = require("readline");

// Create a readline interface and use it to remove all listeners before making a recursive call to start()
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// rl.setMaxListeners(Infinity);

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
        "Update Employee Role",
        "View all Roles",
        "Add Role",
        "View all Departments",
        "Add Departments",
        "Quit",
      ],
    },
  ]);

  switch (main) {
    case "View all Employees":
      viewAllEmployees();
      // rl.removeAllListeners("keypress");
      start();
      console.log("\n Press any key to continue");
      break;
    case "Add Employee":
      addEmployee()
      // rl.removeAllListeners("keypress");
      start();
      console.log("\n Press any key to continue");
      break;
    case "Update Employee Role":
      // TODO
      // rl.removeAllListeners("keypress");
      start();
      console.log("\n Press any key to continue");
      break;
    case "View all Roles":
      viewAllRoles();
      // rl.removeAllListeners("keypress");
      start();
      console.log("\n Press any key to continue");
      break;
    case "Add Role":
      // TODO
      console.log("Logic for Add Role selected.");
      // rl.removeAllListeners("keypress");
      start();
      console.log("\n Press any key to continue");
      break;
    case "View all Departments":
      viewAllDepartments();
      // rl.removeAllListeners("keypress");
      start();
      console.log("\n Press any key to continue");
      break;
    case "Add departments":
      // TODO
      console.log("Logic for 'Add departments' selected.");
      // rl.removeAllListeners("keypress");
      start();
      console.log("\n Press any key to continue");
      break;
    case "Quit":
      // rl.close();
      break;
  }

  // You can access the selected option as 'main' variable here
  // Perform further actions based on the selected option
}
ASCII();
start();


