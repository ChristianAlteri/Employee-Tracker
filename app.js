// Import dependencies
const cTable = require('console.table');
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

// Render title
ASCII = () => {
  console.log("       *    (   (       )     )                 (                      )     (     ");
  console.log("     (  `   )\\ ))\\ ) ( /(  ( /(            *   ))\\ )   (       (    ( /(     )\\ )  ");
  console.log(" (   )\\))( (()/(()/( )\\()) )\\())(   (    ` )  /(()/(   )\\      )\\   )\\())(  (()/(  ");
  console.log(" )\\ ((_)()\\ /(_))(_)|(_\\ ((_)\ )\\  )\\    ( )(_))(_)|(((_)(  (((_)|((_)\ )\\  /(_)) ");
  console.log("((_)(_()((_|_))(_))   ((_)_ ((_|(_)((_)  (_(_()|_))  )\\ _ )\\ )\\___|_ ((_|(_)(_))   ");
  console.log("| __|  \\/  | _ \\ |   / _ \\ \\ / / __| __| |_   _| _ \\ (_)_\\(_|(/ __| |/ /| __| _ \\ ");
  console.log("| _|| |\\/| |  _/ |__| (_) \\ V /| _|| _|    | | |   /  / _ \\  | (__  ' < | _||   / ");
  console.log("|___|_|  |_|_| |____|\\___/ |_| |___|___|   |_| |_|_\\ /_/ \\_\\  \\___|_|\\_\\|___|_|_\\");  
  console.log(".......................................................................................");  
}

function start() {
  ASCII();
  inquirer
    .prompt([
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
    ])
    .then(({ main }) => {
      console.log(main);
      if (main === "View all Employees") {
        console.log("Logic for 'View all Employees' selected.");
      } else if (main === "Add Employee") {
        console.log("Logic for 'Add Employee' selected.");
      } else if (main === "Update Employee Role") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Which employee would you like to update?",
              name: "employee",
            },
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
      } else if (main === "View all Roles") {
        console.log("Logic for 'View all Roles' selected.");
      } else if (main === "Add Role") {
        console.log("Logic for 'Add Role' selected.");
      } else if (main === "View all Departments") {
        console.log("Logic for 'View all Departments' selected.");
      } else if (main === "Add Departments") {
        console.log("Logic for 'Add Departments' selected.");
      } else if (main === "Quit") {
        console.log("Logic for 'Quit' selected.");
      }
      // You can access the selected option as 'main' variable here
      // Perform further actions based on the selected option
    });
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




