select m.medication_name, p.medication_date_prescribed, p.patient_medication_id, 
p.medication_side_effects, p.deleted
from medications m
join patient_medications p on m.medication_id = p.medication_id
where p.patient_id = $1;