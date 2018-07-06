UPDATE family_history
SET condition_id = $1,
family_history_relationship = $2
WHERE family_history_id = $3;