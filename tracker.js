const dbManager = require("./db.js");
const inquirer = require("inquirer");
const cTable = require("console.table");
const {
  promisify
} = require('util');

const getEmployees = promisify(dbManager.viewEmployees);
const getRoles = promisify(dbManager.viewRoles);
const saveEmployee = promisify(dbManager.addEmployee);
const saveEmployeeRole = promisify(dbManager.updateEmployeeRole);


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
        `Update Employee Role`
      ],
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
      dbManager.addDepartment(r.name, async (dbResult) =>
        await console.table({
          departmentId: dbResult.id
        }));
    })
    .then(() => runPrompts());
}

async function addEmployee() {
  const name = await inquirer
    .prompt({
      type: `input`,
      name: `name`,
      message: `Name of the employee?`,
    })
    .then((r) => r.name);

  const roles = await getRoles()
    .then(data => data)
    .catch((err) => err);

  const departments = new Set();
  roles.forEach((x) => departments.add(x.departmentName));

  const selectedDepartment = await inquirer
    .prompt({
      name: "department",
      type: "rawlist",
      message: `In which department will '${name}' work in?`,
      choices: Array.from(departments),
    })
    .then((r) => {
      return r.department;
    });

  const employees = await getEmployees()
    .then(data => data)
    .catch((err) => err);

  const selectedManager = await inquirer
    .prompt({
      name: "manager",
      type: "rawlist",
      message: `Who will be '${name}'s manager?`,
      choices: employees.filter(x => x.employeeDept === selectedDepartment).map(x => x.employeeName),
    })
    .then((r) => {
      console.log(r);
      return r.manager;
    });

  const availableRolesInSelectedDepartment = roles.filter(x => x.departmentName === selectedDepartment);

  const selectedRole = await inquirer
    .prompt({
      name: "role",
      type: "list",
      message: `What role will '${name}' have while working in '${selectedDepartment}'?`,
      choices: availableRolesInSelectedDepartment.map(x => x.roleName),
    })
    .then((r) => r.role);

  const selectedManagerId =
    employees.filter(x => x.employeeDept === selectedDepartment).filter(x => x.employeeName === selectedManager)[0].managerId;

  const selectedRoleId = roles.filter(x => x.roleName === selectedRole)[0].roleId;

  const result = await saveEmployee(name, selectedManagerId, selectedRoleId)
    .then(data => data)
    .catch((err) => err);


  await console.table({
    employeeId: result.insertId,
    message: result.message,
  });

  runPrompts();
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

  const result = await inquirer
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
    .then(async (x) => {
      await saveEmployeeRole(x.employee, x.role)
        .then(d => d)
        .catch(err => console.log("error", err));
    })
    .catch(err => console.log("error", err));

  await console.table(result);
  runPrompts();
}