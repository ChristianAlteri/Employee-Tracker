// Import dependencies
const cTable = require("console.table");
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const { viewAllEmployees, updateEmployee, viewAllRoles, viewAllDepartments } = require("./helper.js");
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
  ASCII();
  // db.helperConnection();
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
      start();
      console.log("\n Press any key to continue");

    case "Add Employee":
      console.log("Logic for  Add Employee selected.");
      start();
      console.log("\n Press any key to continue");

    case "Update Employee Role":
      updateEmployee();
      start();
      console.log("\n Press any key to continue");

    case "View all Roles":
      viewAllRoles();
      start();
      console.log("\n Press any key to continue");

    case "Add Role":
      console.log("Logic for Add Role selected.");
      start();
      console.log("\n Press any key to continue");

    case "View all Departments":
      viewAllDepartments();
      start();
      console.log("\n Press any key to continue");

    case "Add departments":
      console.log("Logic for 'Add departments' selected.");
      start();
      console.log("\n Press any key to continue");

    case "Quit":
      break;
  }

  // You can access the selected option as 'main' variable here
  // Perform further actions based on the selected option
}


// Store the data in response
//   if (response.confirm === "y") {
//     // De structure response
//     const { company, shape, color, textColor } = response;
// Store correct SVG data in logo by running toHTML()
// let logo;
// // Conditional checking what shape the user selected
// if (shape === "triangle") {
//   const triangle = new Triangle(company, color, textColor);
//   logo = triangle.toHTML();
// } else if (shape === "circle") {
//   const circle = new Circle(company, color, textColor);
//   logo = circle.toHTML();
// } else if (shape === "square") {
//   const square = new Square(company, color, textColor);
//   logo = square.toHTML();
//   }
//   // display the tables to the console using console.table
//   console.table([
//     {
//       name: 'foo',
//       age: 10
//     }, {
//       name: 'bar',
//       age: 20
//     }
//   ]);
// } else {
//   console.log("Let's try that again");
//   start();
// }

start();


