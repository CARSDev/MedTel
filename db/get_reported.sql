SELECT *
FROM reported_data rd
JOIN available_tests t ON rd.test_id = t.test_id
WHERE patient_id = $1;