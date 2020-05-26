const mysql = require("mysql");


module.exports = (() => {

  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "New2020ya$!",
    database: "employee_tracker_db"
  });

  const connect = (query) => {
    connection.connect((err) => {
      if (err) throw err;
      console.log("connected as id " + connection.threadId);
      return query();
    })
  }

  function viewDepartments() {
     
    const selectDepartments = 
      
      `
      select * from department; 
     
      `
      const resultsHandler = (err, res) => {
        if (err) throw err;
  
        let resArray = Array.from([]);
  
        for (const record of res) {
          const viewObject = {
            departmentName: record.dept_name 
          }
          // Add condensed object to our return array 
          resArray.push(viewObject);
        } //end for loop
  
        return resArray;
  
      }
  
      const executer = () => { connection.query(selectDepartments, resultsHandler) }
      return connect(executer);
      
  };

  function viewEmployees() {

    const selectEmployees =

      `
      select d.dept_name, r.title, r.salary, x.*
      from department as d
      inner join roles as r
                                 on d.id = r.department_id
     join (
         select
          emp.id as "EmployeeID",emp.last_name as "employeeLastName", 
          emp.first_name as "employeeFirstName", emp.role_id as "employeeRoleID",
           emp.manager_id as "employeeManagerID",
          manager.first_name as "ManagerFirstName", 
          manager.last_name as "managerLastName", manager.role_id as "MangerRoleId", manager.id as "ManagerId"
         from employee as emp
         join employee as manager on manager.id = emp.manager_id
         where manager.id <> emp.id
         order by manager.id
     ) as x on r.id = x.MangerRoleId
                                 
       ORDER BY d.dept_name DESC; 

      `
    // RowDataPacket {
    //     dept_name: 'Research & Development',
    //     title: 'Data Scientist Manager',
    //     salary: 150000,
    //     EmployeeID: 7,
    //     employeeLastName: 'Tribuani',
    //     employeeFirstName: 'Joey',
    //     employeeRoleID: 7,
    //     employeeManagerID: 8,
    //     ManagerFirstName: 'Chandler',
    //     managerLastName: 'Bing',
    //     MangerRoleId: 8,
    //     ManagerId: 8
    //   },

    const resultsHandler = (err, res) => {
      if (err) throw err;

      let resArray = Array.from([]);

      for (const record of res) {
        const viewObject = {
          employeeID: record.employeeID,
          employeeSalary: record.salary,
          employeeName: record.employeeFirstName + " " + record.employeeLastName,
          employeeRole: record.employeeRole,
          employeeManager: record.ManagerFirstName + " " + record.managerLastName,
          employeeDept: record.dept_name
        }
        // Add condensed object to our return array 
        resArray.push(viewObject);
      } //end for loop

      return resArray;

    }

    const executer = () => { connection.query(selectEmployees, resultsHandler) }
    return connect(executer);

  }

  return {
    "viewEmployees": viewEmployees,
    "viewDepartments": viewDepartments 
  }

})()


// function queryAllSongs() {
//   connection.query("SELECT * FROM songs", function (err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//     }
//     console.log("-----------------------------------");
//   });
// }

// function queryDanceSongs() {
//   var query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function (err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//     }


//     logs the actual query being run
//     console.log(query.sql);
//     connection.end();
//   }
