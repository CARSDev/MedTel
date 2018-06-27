SELECT employee_hashed_password, employee_id
FROM employees 
WHERE employee_username ILIKE ${username};