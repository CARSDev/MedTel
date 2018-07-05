INSERT INTO patient_medications
(patient_id, medication_id, medication_date_prescribed, medication_side_effects)
VALUES
($1, $2, $3, $4);