select m.medical_device_name, p.medical_device_date_administered, p.deleted, p.patient_medical_device_id
from medical_devices m
join patient_medical_devices p on m.medical_device_id = p.medical_device_id
where p.patient_id = $1;