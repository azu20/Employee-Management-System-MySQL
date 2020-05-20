const mysql = require("mysql"); 
const inquirer = require("inquirer"); 

let connection; 

const connectToDatabase = async () => {
try {
    connection = await mysql.createConnection({
        host: "localhost",
          port: 3306,
          user: "root",
          password: "New2020ya$!",
          database: "Employee_tracker_db"
        }); 
    
    console.log(`Connected to database with id ${connection.threadId}`);
} catch (err) {
   console.log(error); 
} 
    // runPrompts();
}; 

// funciton runPrompts() {
//     inquirer
//     .prompt ({
//         name: "action",
//         type: "rawlist",
//         message: "What would you like to do?",
//         choices: [
//             "View Departments", 
//             "View Roles", 
//             "View Employees", 
//             "View Employees by Manager",
//             "Add Departments",
//             "Add Employee Role",
//             "Add New Employee",
//             "Update Employee Role",
//             "Update Employee Manager",
//             "Delete Department",
//             "Delete Employee Role",
//             "Delete Employee",
//             "View current salary budget by department"
//         ]
//     }) 
//     .then(function(answer) {
//         switch(answer.action) {
//         case "View Departments":
//             deptSearch(); 
//             break; 
//         case "View Roles":
//             viewRole();
//             break; 
//         case "View Employees":
//             viewEmployees(); 
//             break; 
//         case "View Employees by Manager": 
//             viewERbyMngr(); 
//             break; 

        // "Add Departments",
        // "Add Employee Role",
        // "Add New Employee",
        // "Update Employee Role",
        // "Update Employee Manager",
        // "Delete Department",
        // "Delete Employee Role",
        // "Delete Employee",
        // "View current salary budget by department"        
            

//         }
//     });
//  }

//  function deptSearch() {
//      inquirer
//      prompt({
//          name: "department", 
//          type: "input", 
//          message: ""
//      })
//  }

