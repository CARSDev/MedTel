SELECT pv.patient_visit_date, p.patient_full_name, pv.patient_id, pv.patient_visit_reason 
FROM patient_visits pv
JOIN patients p
ON pv.patient_id = p.patient_id
WHERE patient_visit_date BETWEEN
$1 AND $2