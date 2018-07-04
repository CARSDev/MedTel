update employees
set(employee_full_name, employee_first_name, employee_last_name, employee_picture, role_id, employee_username, employee_email)
=($2, $3, $4, $5, $6, $7, $8)
where employee_id=$1
