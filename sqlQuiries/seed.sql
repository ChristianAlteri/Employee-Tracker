-- Inserting data into employees table

-- Inserting data into roles table
INSERT INTO roles (id, title, salary, department_id)
VALUES
  (1, 'Sales lead', 100000, 1),
  (2, 'Salesperson', 80000, 1),
  (3, 'Lead engineer', 150000, 2),
  (4, 'Software engineer', 120000, 2),
  (5, 'Account manager', 160000, 3),
  (6, 'Accountant', 125000, 3),
  (7, 'Legal team lead', 250000, 4),
  (8, 'Lawyer', 190000, 4);

-- Inserting data into departments table
INSERT INTO departments (id, name)
VALUES
  (1, 'Sales'),
  (2, 'Engineering'),
  (3, 'Finance'),
  (4, 'Legal');
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Mike', 'Chan', 2, 1),
  (3, 'Ash', 'Rod', 3, NULL),
  (4, 'Kev', 'Tup', 4, 3),
  (5, 'Kun', 'Singh', 5, NULL),
  (6, 'Malia', 'Brown', 6, 5),
  (7, 'Sarah', 'Lourd', 7, NULL),
  (8, 'Tom', 'Allen', 8, 7);
