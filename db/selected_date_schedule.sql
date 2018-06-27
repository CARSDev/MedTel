select * from patient_visits
where patient_visit_date BETWEEN
$1 AND $2