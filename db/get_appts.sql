SELECT pv.patient_visit_date, e.employee_full_name, vt.visit_type_name, pv.patient_visit_reason
FROM patient_visits pv
JOIN visit_types vt ON vt.visit_type_id = pv.visit_type_id
JOIN employees e ON e.employee_id = pv.employee_id
WHERE pv.patient_id = $1 AND pv.patient_visit_date > $2
ORDER BY pv.patient_visit_date ASC
LIMIT 2;