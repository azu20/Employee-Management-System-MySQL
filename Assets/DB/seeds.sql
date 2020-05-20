USE Employee_tracker_db; 

INSERT INTO department (id, dept_name)
VALUES (1, "Human Resources"), (2, "Accounting and Finance"), (3, "Marketing"), (4, "Research & Development"), (5, "Operations"), (6, "Sales"); 

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Lead HR Coordinator", 95000, 1), (2, "Junior HR Coordinator", 45000, 1), (3, "Senior HR Coordinator", 75000, 1), (4, "Lead Recruiter", 95000, 1),
(5, "Senior Recruiter", 78000, 1), (6, "Recruiter", 65000, 1), (7, "Accounting Manager", 105000, 2), (8, "Junior accountant", 55000, 2), 
(9, "Senior Accountant", 85000, 2), (10, "Senior Marketing Specialist", 95000, 3), (11, "Marketing Specialist", 68000, 3), 
(12, "Marketing Manager", 95000, 3), (13, "Data Scientist", 110000, 4), (14, "Data Scientist Manager", 150000, 4), 
(15, "Operations Manager", 87000, 5), (16, "Senior Customer Service", 40000, 5), (17, "Customer Service Specialist", 34000, 5), 
(18, "Sales Manager", 85000, 6), (19, "Sales Specialist", 45000, 6), (20, "Senior Sales Specialist", 60000, 6), (21, "HR Manager", 100000, 1); 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "john", "Smith", 1, 21), (2, "Albert", "Jimenez", 2, 21), (3, "Samantha", "Johnson", 3, 21), (4, "Jeremy", "Potts", 8, 7),
(5, "Sofie", "Turner", 9, 7), (6, "Joe", "Jonah", 10, 12), (7, "Joey", "Tribuani", 10, 12), (8, "Chandler", "Bing", 13, 14), 
(9, "Monica", "Geller", 13, 14), (10, "Rachel", "Green", 16, 15), (11, "Ross", "Geller", 17, 15), 
(12, "Pheobe", "Flangy", 20, 18), (13, "Mike", "Adams", 19, 18); 