const mysql = require("mysql");
const {
  promisify
} = require('util');

// const mysqlConnect = promisify(mysql.createConnection);

const PASSWORD = "New2020ya$!";

module.exports = (() => {
  const selectEmployees = `
      SELECT 
            d.dept_name as "employeeDepartment",
            dm.dept_name as "managerDepartment",
            managerRole.title as "managerTitle",
            employeeRole.title as "employeeTitle",
            employeeRole.salary,
            x.*
      FROM
        (SELECT emp.id AS "EmployeeID",
                emp.last_name AS "employeeLastName",
                emp.first_name AS "employeeFirstName",
                emp.role_id AS "employeeRoleID",
                emp.manager_id AS "employeeManagerID",
                manager.first_name AS "ManagerFirstName",
                manager.last_name AS "managerLastName",
                manager.role_id AS "MangerRoleId",
                manager.id AS "ManagerId"
        FROM employee AS emp
        JOIN employee AS manager ON manager.id = emp.manager_id 
        -- where manager.id <> emp.id
        ORDER BY manager.id) x
      INNER JOIN roles AS managerRole ON managerRole.id = x.MangerRoleId
      INNER JOIN roles AS employeeRole ON employeeRole.id = x.employeeRoleID
      INNER JOIN department AS d ON d.id = employeeRole.department_id
      INNER JOIN department AS dm ON dm.id = managerRole.department_id
      ORDER BY x.managerLastName DESC;
      `;

  async function updateEmployeeRole(employeeName, role, whoToCallWhenDone) {
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: PASSWORD,
      database: "employee_tracker_db",
    });
    const connect = promisify(connection.connect.bind(connection));

    const output =
      await connect()
      .then(async () => {
        const runQuery = promisify(connection.query.bind(connection));
        const response =
          await runQuery(`select id from roles where title = '${role}'`)
          .then((selectResponse) => {
            const id = selectResponse[0].id;
            return id;
          })
          .then(async (id) => {
            await runQuery(`update employee set role_id = ${id} where concat(first_name,' ',last_name) = '${employeeName}' ;`)
              .then((updateResponse) => updateResponse)
              .catch((err) => console.log('ERROR:', err));
          })
          .catch((err) => console.log('ERROR:', err));
        return response;
      })
      .catch(err => console.log("error", err));
    connection.end();
    whoToCallWhenDone(output);
  }

  function addDepartment(departmentName, whoToCallWhenDone) {
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: PASSWORD,
      database: "employee_tracker_db",
    });
    connection.connect((err) => {
      if (err) throw err;
      // console.log("connected as id " + connection.threadId);
      const addDepartmentSql = `
    insert into department(dept_name) values('${departmentName}')
  `;
      connection.query(addDepartmentSql, (err, res) => {
        if (err) throw err;

        whoToCallWhenDone({
          DepartmentName: departmentName,
          id: res.insertId
        });
        connection.end();
      });
    });
  }

  async function addEmployee(employeeName, manager_id, role_id, whoToCallWhenDone) {
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: PASSWORD,
      database: "employee_tracker_db",
    });
    const connect = promisify(connection.connect.bind(connection));

    const output = await connect()
      .then(async () => {
        const runQuery = promisify(connection.query.bind(connection));
        let name = employeeName.split(' '); //bad logic
        if (name.size != 2) {
          name[0] = employeeName;
          name[1] = "";
        }
        const result =
          await runQuery(`
          INSERT INTO employee(first_name, last_name, role_id, manager_id)
          VALUES('${name[0]}', '${name[1]}', ${role_id}, ${manager_id})
          `)
          .then(async res => {
            return res;
          })
          .catch(err => console.log("error", err));
        return result;
      })
      .catch(err => console.log("error", err));
    connection.end();
    whoToCallWhenDone(output);
  }

  async function viewEmployees(whoToCallWhenDone) {
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: PASSWORD,
      database: "employee_tracker_db",
    });
    const connect = promisify(connection.connect.bind(connection));

    const output = await connect()
      .then(async () => {
        const runQuery = promisify(connection.query.bind(connection));
        const result = await runQuery(selectEmployees)
          .then((res) => {

            const resArray = Array.from([]);
            for (const record of res) {
              const viewObject = {
                Id: record.EmployeeID,
                employeeName: record.employeeFirstName + " " + record.employeeLastName,
                employeeRole: record.employeeTitle,
                // managerRole: record.managerTitle,
                employeeSalary: record.salary,
                employeeManager: record.ManagerFirstName + " " + record.managerLastName,
                managerId: record.ManagerId,
                employeeDept: record.employeeDepartment,
              };
              // Add condensed object to our return array
              resArray.push(viewObject);
            } //end for loop
            connection.end();
            return resArray;
          })
          .catch(err => console.log("error", err));
        return result;
      })
      .catch((err) => {
        console.log("error", err);
      });

    whoToCallWhenDone(output);

  }

  async function viewDepartments(whoToCallWhenDone) {
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: PASSWORD,
      database: "employee_tracker_db",
    });
    const connect = promisify(connection.connect.bind(connection));

    const output = await connect()
      .then(async () => {
        const runQuery = promisify(connection.query.bind(connection));
        const result = await runQuery(`select * from department;`)
          .then((res) => {
            const resArray = Array.from([]);
            for (const record of res) {
              const viewObject = {
                departmentId: record.id,
                departmentName: record.dept_name,
              };
              resArray.push(viewObject);
            }
            connection.end();
            return resArray;
          })
          .catch(err => console.log("error", err));
        return result;
      })
      .catch((err) =>
        console.log("ERROR executing query", err)
      );
    whoToCallWhenDone(output);
  }

  async function viewRoles(whoToCallWhenDone) {
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: PASSWORD,
      database: "employee_tracker_db",
    });
    const connect = promisify(connection.connect.bind(connection));
    const output = await connect()
      .then(async () => {
        const runQuery = promisify(connection.query.bind(connection));
        const result = await runQuery(`select r.id as roleId,r.title,r.salary,d.dept_name,d.id as dept_id from roles as r join department as d on d.id=r.department_id;`)
          .then(async (res) => {
            const resArray = Array.from([]);
            for (const record of res) {
              const viewObject = {
                roleId: record.roleId,
                roleName: record.title,
                roleSalary: record.salary,
                departmentName: record.dept_name,
                departmentId: record.dept_id,
              };
              resArray.push(viewObject);
            }
            connection.end();
            return resArray;
          })
          .catch(err => console.log("error", err));
        return result;
      })
      .catch(err => console.log("error  ", err));
    whoToCallWhenDone(output);
  }



  return {
    viewDepartments: viewDepartments,
    viewEmployees: viewEmployees,
    viewRoles: viewRoles,
    addDepartment: addDepartment, //not working
    addEmployee: addEmployee, // not working
    updateEmployeeRole: updateEmployeeRole, // working just modify the output - hide raw data package. 

  };
})();