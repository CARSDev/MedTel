select c.condition_name, p.condition_date_diagnosed, p.deleted, p.patient_condition_id
from conditions c
join patient_conditions p on c.condition_id = p.condition_id
where p.patient_id = $1;