

INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES
  ('John', 'Doe', 'Sales lead', 1, 100000, NULL),
  ('Mike', 'Chan', 'Salesperson', 1, 80000, 'John Doe'),
  ('Ash', 'Rod', 'Lead engineer', 2, 150000, NULL),
  ('Kev', 'Tup', 'Software engineer', 2, 120000, 'Ash Rod'),
  ('Kun', 'Singh', 'Account manager', 3, 160000, NULL),
  ('Malia', 'Brown', 'Accountant', 3, 125000, 'Kun Singh'),
  ('Sarah', 'Lourd', 'Legal team lead', 4, 250000, NULL),
  ('Tom', 'Allen', 'Lawyer', 4, 190000, 'Sarah Lourd');


INSERT INTO roles (id, title, department, salary)
VALUES
  (1, 'Sales lead', 1, 100000),
  (2, 'Salesperson', 1, 80000),
  (3, 'Lead engineer', 2, 150000),
  (4, 'Software engineer', 2, 120000),
  (5, 'Account manager', 3, 160000),
  (6, 'Accountant', 3, 125000),
  (7, 'Legal team lead', 4, 250000),
  (8, 'Lawyer', 4, 190000);


INSERT INTO departments (id, name)
VALUES
  (2, 'Engineering'),
  (3, 'Finance'),
  (4, 'Legal'),
  (1, 'Sales');

