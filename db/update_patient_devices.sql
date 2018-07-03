UPDATE patient_medical_devices
SET deleted = TRUE
WHERE patient_medical_device_id = $1;