INSERT INTO companies
(company_name)
VALUES
('Test Company');

INSERT INTO roles
(role_name)
VALUES
('Admin');

insert into genders
(gender_name)
VALUES
('male'),
('female');

INSERT INTO employees
(company_id, employee_full_name, employee_first_name, employee_last_name, role_id, employee_email, employee_hashed_password, employee_username)
VALUES
(1, 'John Smith', 'John', 'Smith', 1, 'johnsmith@me.com', 'password', 'jsmith');

INSERT INTO patients
(company_id, patient_full_name, patient_first_name, patient_last_name, patient_gender, patient_address, patient_phone_number, patient_email, patient_emergency_contact_name, patient_emergency_contact_number, patient_emergency_contact_relationship )
VALUES
(1, 'Test Patient', 'Test', 'Patient', 1, '123 Test Address Alpine, Utah 84004', '0123456789', 'test@patient.com', 'Test Emergency Contact', 1234567890, 'Test Relationship');

INSERT INTO conditions
(condition_name)
VALUES
('Asthma');

INSERT INTO patient_conditions
( patient_id, condition_id)
VALUES
(1, 1);

INSERT INTO allergies
(allergy_name)
VALUES
('Peanuts');

INSERT INTO patient_allergies
(patient_id, allergy_id)
VALUES
(1, 1);

INSERT INTO medications
(medication_name)
VALUES
('Albuterol');

INSERT INTO patient_medications
(medication_id, patient_id, medication_side_effects)
VALUES(1, 1, 'shaky');

INSERT INTO medical_devices
(medical_device_name)
VALUES
('pacemaker');

INSERT INTO patient_medical_devices
(medical_device_id, patient_id)
VALUES
(1, 1);

INSERT INTO family_history
(patient_id, family_history_relationship, condition_id)
VALUES
(1, 'father', 1);

INSERT INTO visit_types
(visit_type_name)
VALUES
('Primary Care');

INSERT INTO patient_visits
(visit_type_id, patient_id, employee_id, patient_visit_note)
VALUES
(1, 1, 1, 'This was a great visit and I totally loved it!');

INSERT INTO available_tests
(test_name)
VALUES
('height in inches'),
('weight in pounds'),
('chest x-ray');

INSERT INTO lab_results
(test_id, patient_id, lab_result)
VALUES
(1, 1, 72),
(2, 1, 180);

INSERT INTO imaging_results
(test_id, patient_id, imaging_result, imaging_pictures)
VALUES
(3, 1, 'Xray negative', 'https://images.radiopaedia.org/images/30134883/94d0d52b219b0cae507d3bbe19d470_jumbo.jpeg');

INSERT INTO reported_data
(test_id, patient_id, reported_data)
VALUES
(1, 1, 73);