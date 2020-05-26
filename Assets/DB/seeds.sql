USE employee_tracker_db;
INSERT INTO department (id, dept_name)
VALUES
  (1, "Human Resources"),
  (2, "Accounting and Finance"),
  (3, "Marketing"),
  (4, "Research & Development"),
  (5, "Operations"),
  (6, "Sales");
INSERT INTO roles (id, title, salary, department_id)
VALUES
  (1, "Junior HR Coordinator", 45000, 1),
  (2, "HR Manager", 100000, 1),
  (3, "Accounting Manager", 105000, 2),
  (4, "Junior accountant", 55000, 2),
  (5, "Marketing Specialist", 68000, 3),
  (6, "Marketing Manager", 95000, 3),
  (7, "Data Scientist", 110000, 4),
  (8, "Data Scientist Manager", 150000, 4),
  (9, "Operations Manager", 87000, 5),
  (10, "Customer Service Specialist", 34000, 5),
  (11, "Sales Manager", 85000, 6),
  (12, "Sales Specialist", 45000, 6);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, "john", "Smith", 1, 2),
  (2, "Albert", "Jimenez", 2, 2),
  (3, "Samantha", "Johnson", 3, 3),
  (4, "Jeremy", "Potts", 4, 3),
  (5, "Sofie", "Turner", 5, 6),
  (6, "Joe", "Jonah", 6, 6),
  (7, "Joey", "Tribuani", 7, 8),
  (8, "Chandler", "Bing", 8, 8),
  (9, "Monica", "Geller", 9, 10),
  (10, "Rachel", "Green", 10, 10),
  (11, "Ross", "Geller", 11, 12),
  (12, "Pheobe", "Flangy", 12, 12);