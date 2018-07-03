INSERT INTO patients
(company_id, patient_full_name, patient_first_name, patient_last_name, patient_birthday, patient_gender, patient_address, patient_phone_number, patient_email, patient_emergency_contact_name, patient_emergency_contact_number, patient_emergency_contact_relationship)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);