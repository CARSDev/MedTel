SELECT p.patient_allergy_id, a.allergy_name, p.allergy_date_diagnosed, p.deleted
FROM patient_allergies p
JOIN allergies a ON p.allergy_id = a.allergy_id
where p.patient_id = $1
ORDER BY allergy_date_diagnosed DESC;

