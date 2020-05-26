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
                "Add Departments",
                "Delete Department",
                "View All Employees",
                "View Employees by Department",
                "View Employees by Manager",
                "Update Employee Manager",
                "Add Employee",
                "Remove Employee",
                "View All Roles",
                "Add Employee Role",
                "Update Employee Role", 
                "Remove Employee Role",
                "View current salary budget by department"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Departments":
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRole();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View Employees by Manager":
                    viewERbyMngr();
                    break;     

            }
        });
};

function viewEmployees() {
    console.log(dbManager.viewEmployees());
}

function viewDepartments() {
    console.log(dbManager.viewDepartments());
};