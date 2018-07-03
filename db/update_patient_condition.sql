UPDATE patient_conditions
SET deleted = TRUE
WHERE patient_condition_id = $1;