SELECT * 
FROM lab_results lr
JOIN available_tests at ON at.test_id = lr.test_id
WHERE lr.patient_id = $1 AND at.test_name in ('height in inches', 'weight in pounds')
ORDER BY lab_date ASC;