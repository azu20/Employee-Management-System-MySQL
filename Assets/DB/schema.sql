DROP DATABASE if EXISTS employee_tracker_db;
create database employee_tracker_db;
use employee_tracker_db;
create table department (
  id INT AUTO_INCREMENT NOT NULL,
  dept_name varchar(30),
  primary key(id)
);
create table roles (
  id INT AUTO_INCREMENT NOT NULL,
  title varchar(30),
  salary decimal(8, 2),
  department_id int,
  primary key(id)
);
create table employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name varchar(30),
  last_name varchar(30),
  role_id INT,
  manager_id int not null,
  primary key(id)
);