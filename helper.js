const inquirer = require("inquirer");
const db = require("./connect.js");


const updateEmployee  = () => {
    return inquirer
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
  };

  const viewAllEmployees = () => {  
      const {dataBase} = db.helperConnection();
      
      console.log(dataBase);
      // dataBase.execute("SELECT * FROM employees")
      // .then(([allEmployees]) => {
      //   console.table(allEmployees);
      // });
  };


module.exports = {
  viewAllEmployees, updateEmployee
};
