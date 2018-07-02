UPDATE patient_conditions
SET
condition_id = $1,
condition_date_diagnosed = $2
WHERE patient_condition_id = $3;