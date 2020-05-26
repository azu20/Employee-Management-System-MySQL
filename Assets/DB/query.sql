select *
from department;
select *
from roles;
select *
from employee;



select
	emp.id as "EmployeeID", emp.last_name, emp.first_name, emp.role_id, emp.manager_id,
	manager.first_name, manager.last_name, manager.role_id
from employee as emp
	join employee as manager on manager.id = emp.manager_id
where manager.id <> emp.id
order by manager.id;

-- View departments, roles, employees
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


-- View employees by manager
select employee.manager_id, roles.title, employee.first_name, employee.last_name
from roles
	join employee
	on roles.department_id = employee.manager_id
-- group by employee.manager_id
ORDER BY employee.manager_id;

-- or 
select *
from employee
	inner join employee.role_id
	on employee.manager_id = employee.role_id
where employee.manager_id = 12; 
 
 
 

