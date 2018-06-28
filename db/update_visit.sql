UPDATE patient_visits
SET patient_visit_reason = $2, patient_visit_note = $3
WHERE patient_visit_id = $1;