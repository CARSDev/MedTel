SELECT  pv.*, e.employee_first_name, e.employee_last_name
FROM patient_visits pv 
JOIN employees e on PV.employee_id = e.employee_id
WHERE patient_id = $1
ORDER BY patient_visit_date ASC;