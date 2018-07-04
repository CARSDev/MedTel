SELECT *
FROM imaging_results ir
JOIN available_tests t ON ir.test_id = t.test_id
WHERE patient_id = $1;