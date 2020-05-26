const dbManager = require("./db.js");
const inquirer = require("inquirer");


runPrompts();

async function runPrompts() {

    await inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "View Employees by Manager",
                "Add Departments",
                "Add Employee Role",
                "Add New Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "Delete Department",
                "Delete Employee Role",
                "Delete Employee",
                "View current salary budget by department"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Departments":
                    deptSearch();
                    break;
                case "View Roles":
                    viewRole();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "View Employees by Manager":
                    viewERbyMngr();
                    break;
                // "Add Departments",
                // "Add Employee Role",
                // "Add New Employee",
                // "Update Employee Role",
                // "Update Employee Manager",
                // "Delete Department",
                // "Delete Employee Role",
                // "Delete Employee",
                // "View current salary budget by department"        


            }
        });
};

function viewEmployees() {
    console.log(dbManager.viewEmployees());
}

