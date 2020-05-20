select * from deparment; 
select * from roles; 
select *from employee; 

-- View departments, roles, employees
 select department.dept_name, roles.title, employee.first_name, employee.last_name
 from department
 join roles 
 on department.id = roles.department_id
 join employee 
 on roles.department_id = employee.manager_id; 
 
-- View employees by manager
 select roles.title, employee.first_name, employee.last_name
 from roles
 join employee 
 on roles.department_id = employee.manager_id; 
