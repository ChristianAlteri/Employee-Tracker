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
}


function start() {
  ASCII();
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "What is the name of your company (must be no more than 3 characters)?",
        name: "company",
        validate: validateCompany,
      },
      {
        type: "list",
        message: "Select the shape of your logo:",
        name: "shape",
        choices: ["circle", "triangle", "square"],
      },
      {
        type: "input",
        message: "Select the color of your logo:",
        name: "color",
      },
      {
        type: "input",
        message: "Select the color of your font:",
        name: "textColor",
      },
      {
        type: "input",
        message: "Press y to make your SVG:",
        name: "confirm",
      },
    ])
    // Store the data in response
    .then((response) => {
      if (response.confirm === "y") {
        // De structure response
        const { company, shape, color, textColor } = response;
        // Store correct SVG data in logo by running toHTML()
        let logo;
        // Conditional checking what shape the user selected
        if (shape === "triangle") {
          const triangle = new Triangle(company, color, textColor);
          logo = triangle.toHTML();
        } else if (shape === "circle") {
          const circle = new Circle(company, color, textColor);
          logo = circle.toHTML();
        } else if (shape === "square") {
          const square = new Square(company, color, textColor);
          logo = square.toHTML();
        }
        // write the logo to the folder ./examples
        fs.writeFileSync("./examples/logo.svg", logo);
        console.log("Generated logo.svg");
      } else {
        console.log("Let's try that again");
        start();
      }
    });
}

start();




