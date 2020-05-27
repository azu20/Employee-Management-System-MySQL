const mysql = require("mysql");
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
        JOIN employee AS manager ON manager.id = emp.manager_id -- where manager.id <> emp.id

        ORDER BY manager.id) x
      INNER JOIN roles AS managerRole ON managerRole.id = x.MangerRoleId
      INNER JOIN roles AS employeeRole ON employeeRole.id = x.employeeRoleID
      INNER JOIN department AS d ON d.id = employeeRole.department_id
      INNER JOIN department AS dm ON dm.id = managerRole.department_id
      ORDER BY x.managerLastName DESC;
      `;

  function updateEmployeeRole(employeeName, role, whoToCallWhenDone) {
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: PASSWORD,
      database: "employee_tracker_db",
    });
    connection.connect((err) => {
      if (err) throw err;

      connection.query(
        `select id from roles where title = '${role}'`,
        (err, selectResponse) => {
          if (err) throw err;

          const id = selectResponse[0].id;

          connection.query(
            `update employee set role_id = ${id} where concat(first_name,' ',last_name) = '${employeeName}' ;`,
            (err, updateResponse) => {
              if (err) throw err;
              whoToCallWhenDone(updateResponse);
              connection.end();
            }
          );
        }
      );
    });
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

  function addEmployee(employeeName, whoToCallWhenDone) {
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

      connection.query(`insert into employee`, (err, res) => {
        if (err) throw err;

        whoToCallWhenDone({
          DepartmentName: departmentName,
          id: res.insertId
        });
        connection.end();
      });
    });
  }

  function viewEmployees(whoToCallWhenDone) {
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

      connection.query(selectEmployees, (err, res) => {
        if (err) throw err;

        const resArray = Array.from([]);
        for (const record of res) {
          const viewObject = {
            // employeeID: record.EmployeeID,
            employeeName: record.employeeFirstName + " " + record.employeeLastName,
            employeeRole: record.employeeTitle,
            // managerRole: record.managerTitle,
            employeeSalary: record.salary,
            employeeManager: record.ManagerFirstName + " " + record.managerLastName,
            employeeDept: record.employeeDepartment,
          };
          // Add condensed object to our return array
          resArray.push(viewObject);
        } //end for loop

        whoToCallWhenDone(resArray);
        connection.end();
      });
    });
  }

  function viewDepartments(whoToCallWhenDone) {
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

      connection.query(`select * from department;`, (err, res) => {
        if (err) throw err;

        const resArray = Array.from([]);

        for (const record of res) {
          const viewObject = {
            departmentName: record.dept_name,
          };
          // Add condensed object to our return array
          resArray.push(viewObject);
        } //end for loop

        whoToCallWhenDone(resArray);
        connection.end();
      });
    });
  }

  function viewRoles(whoToCallWhenDone) {
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

      connection.query(`select r.title,r.salary,d.dept_name from roles as r join department as d on d.id=r.department_id;`, (err, res) => {
        if (err) throw err;

        const resArray = Array.from([]);

        for (const record of res) {
          const viewObject = {
            roleName: record.title,
            roleSalary: record.salary,
            departmentName: record.dept_name
          };
          // Add condensed object to our return array
          resArray.push(viewObject);
        } //end for loop

        whoToCallWhenDone(resArray);
        connection.end();
      });
    });
  }



  return {
    viewDepartments: viewDepartments,
    viewEmployees: viewEmployees,
    viewRoles: viewRoles,
    addDepartment: addDepartment,
    addEmployee: addEmployee,
    updateEmployeeRole: updateEmployeeRole,

  };
})();