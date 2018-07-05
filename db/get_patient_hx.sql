SELECT f.family_history_id, c.condition_id, c.condition_name, f.family_history_relationship
FROM conditions c
JOIN family_history f ON c.condition_id = f.condition_id
WHERE f.patient_id = $1;