const dbManager = require("./db.js");
const inquirer = require("inquirer");
const cTable = require("console.table");

runPrompts();

async function runPrompts() {
  await inquirer
    .prompt({
      type: `list`,
      name: `action`,
      message: `What would you like to do?`,
      choices: [`View Departments`,
        `View Employees`,
        `View Roles`,
        `Add Department`,
        `Add Employee`,
        `Add Role`,
        `Update Employee Role`],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Departments":
          viewDepartments();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
      }
    });
}

function showData(result) {
  console.table(result);
  runPrompts();
}


function viewDepartments() {
  dbManager.viewDepartments(showData);
}

function viewEmployees() {
  dbManager.viewEmployees(showData);
}

function viewRoles() {
  dbManager.viewRoles(showData);
}

async function addDepartment() {
  await inquirer
    .prompt({
      type: `input`,
      name: `name`,
      message: `Name of the department?`,
    })
    .then((r) => {
      dbManager.addDepartment(r.name, (dbResult) =>
        console.table(dbResult)
      );
    })
    .then(() => runPrompts());
}

async function addEmployee() {
  await inquirer
    .prompt({
      type: `input`,
      name: `name`,
      message: `Name of the employee?`,
    })
    .then(async (r) => {
      const employee = r.name;
      let departments = Array.from([]);

      await dbManager.viewDepartments((data) => {

        departments = Array.from(data);
      });
      console.log("data is:       ");
      console.log(departments);

      // const result = await inquirer.prompt({
      //   name: "department",
      //   type: "list",
      //   message: `What department will ${employeeName} be in?`,
      //    choices: ??,
      // });

    })
    // .then(() => {
    //    dbManager.addEmployee(r.name, (dbResult) =>
    //      console.table(dbResult)
    //    );
    // })
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
      type: `list`,
      name: `employee`,
      message: `Which employee do you want to update?`,
      choices: employees,
    })
    .then(async (e) => {
      const employee = e.employee;
      const role = await inquirer.prompt({
        type: `list`,
        name: `role`,
        message: `What role do you want to for ${e.employee} ?`,
        choices: rolesArray,
      });
      return {
        role: role.role,
        employee: employee
      };
    })
    .then((x) => {
      // console.log(r);
      dbManager.updateEmployeeRole(x.employee, x.role, (dbresponse) => {
        // console.table(dbresponse);
      });
    })
    .then(() => runPrompts());
}