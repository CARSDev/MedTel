SELECT * 
FROM patients p
JOIN genders g ON g.gender_id = p.patient_gender
WHERE patient_id = 1;