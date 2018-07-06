UPDATE patients
SET patient_first_name = $1,
    patient_last_name = $2,
    patient_full_name = $17,
    patient_birthday = $3,
    patient_gender = $4,
    patient_address = $7,
    patient_phone_number = $8,
    patient_email = $9,
    patient_emergency_contact_name = $10,
    patient_emergency_contact_relationship = $11,
    patient_emergency_contact_number = $12,
    patient_emergency_contact_name2 = $13,
    patient_emergency_contact_relationship2 = $14,
    patient_emergency_contact_number2 = $15
WHERE patient_id = $16;

UPDATE lab_results
SET lab_result = $5
WHERE test_id = 1 AND patient_id = $16;

UPDATE lab_results
SET lab_result = $6
WHERE test_id = 2 AND patient_id = $16;