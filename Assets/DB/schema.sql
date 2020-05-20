create database	Employee_tracker_db; 

use Employee_tracker_db; 

create table department (
	id INT not null, 
    dept_name varchar(30), 
    
    primary key(id)
); 

 select * from department; 
 
create table roles (
	id INT not null, 
    title varchar(30), 
    salary decimal(8,2),
    department_id int, 
    
    primary key(id)
);

 select * from roles; 
 
create table employee (
	id INT AUTO_INCREMENT NOT NULL, 
    first_name varchar(30), 
    last_name varchar(30), 
    role_id INT, 
	manager_id int not null,
    
    primary key(id) 
);
 
 select * from employee; 