UPDATE patient_allergies
SET deleted = TRUE
WHERE patient_allergy_id = $1;