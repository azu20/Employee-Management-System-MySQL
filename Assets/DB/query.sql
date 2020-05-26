
select *
from department;

-- view all roles
select *
from roles;

-- view all employees
select *
from employee;

-- View Employees by Manager 
select
	emp.id as "EmployeeID", emp.last_name as "employeeLastName", emp.first_name as "employeeFirstName", emp.role_id as "employeeID", emp.manager_id as "employeeManagerID",
	manager.first_name as "managerFirstName", manager.last_name as "managerLastNamge", manager.role_id as "managerRoleID"
from employee as emp
	join employee as manager on manager.id = emp.manager_id
where manager.id <> emp.id
order by manager.id;

-- View Employees by Department 
select d.dept_name, r.title, x.*
from department as d
	inner join roles as r
	on d.id = r.department_id
	join (
	select
		emp.id as "EmployeeID", emp.last_name as "employeeLastName", emp.first_name as "employeeFirstName", emp.manager_id as "employeeManagerID"
	from employee as emp
) as x on r.id = x.employeeManagerID
ORDER BY d.dept_name DESC;

-- View employees by departments, roles, managers
select d.dept_name, r.title, x.*
from department as d
	inner join roles as r
	on d.id = r.department_id
	join (
	select
		emp.id as "EmployeeID", emp.last_name as "employeeLastName", emp.first_name as "employeeFirstName", emp.role_id as "employeeRoleID", emp.manager_id as "employeeManagerID",
		manager.first_name as "ManagerFirstName", manager.last_name as "managerLastName ", manager.role_id as "MangerRoleId", manager.id as "ManagerId"
	from employee as emp
		join employee as manager on manager.id = emp.manager_id
	where manager.id <> emp.id
	order by manager.id
) as x on r.id = x.MangerRoleId
ORDER BY d.dept_name DESC;






 
 
 

