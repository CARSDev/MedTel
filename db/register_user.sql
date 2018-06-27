INSERT INTO employees
(employee_first_name, employee_last_name, employee_full_name, role_id, employee_email, employee_username, employee_hashed_password)
VALUES
($1, $2, $3, $4, $5, $6, $7);