SELECT *
FROM lab_results lr
JOIN available_tests t ON lr.test_id = t.test_id
WHERE patient_id = $1;