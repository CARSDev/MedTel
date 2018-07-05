UPDATE patient_medications
SET deleted = TRUE
WHERE patient_medication_id = $1;