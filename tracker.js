const dbManager = require("./db.js");
const inquirer = require("inquirer");
const cTable = require("console.table");

runPrompts();

async function runPrompts() {
  await inquirer
    .prompt({
      name: "action",
      type: "list",
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
        "View current salary budget by department",
      ],
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
        case "Add Departments":
          addDepartment();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
      }
    });
}

async function addDepartment() {
  await inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "Name of the department?",
    })
    .then((r) => {
      dbManager.addDepartment(r.addDepartment, (dbResult) =>
        console.table(dbResult)
      );
    })
    .then(() => runPrompts());
}

function updateEmployeeRole() {
  dbManager.viewEmployees(listEmployees);
}

async function listEmployees(results) {
  let employees = Array.from([]);
  let rolesSet = new Set();

  for (const employee of results) {
    employees.push(employee.employeeName);
  }
  for (const employee of results) {
    rolesSet.add(employee.employeeRole);
  }
  const rolesArray = Array.from(rolesSet);

  await inquirer
    .prompt({
      name: "employee",
      type: "list",
      message: "Which employee do you want to update?",
      choices: employees,
    })
    .then(async (e) => {
      const employee = e.employee;
      const role = await inquirer.prompt({
        name: "role",
        type: "list",
        message: `What role do you want to for ${e.employee} ?`,
        choices: rolesArray,
      });
      return { role: role.role, employee: employee };
    })
    .then((x) => {
      // console.log(r);
      dbManager.updateEmployeeRole(x.employee, x.role, (dbresponse) => {
        console.table(dbresponse);
      });
    })
    .then(() => runPrompts());
}

function viewEmployees() {
  dbManager.viewEmployees(showEmployees);
}
function showEmployees(result) {
  console.table(result);
  runPrompts();
}

function viewDepartments() {
  dbManager.viewDepartments();
}
