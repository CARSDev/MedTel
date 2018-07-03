INSERT INTO companies
(company_name, company_logo)
VALUES
('Test Company', 'https://image.freepik.com/free-vector/health-company-logo-template_1071-28.jpg');

INSERT INTO roles
(role_name)
VALUES
('Admin'),
('Non-Admin');

insert into genders
(gender_name)
VALUES
('male'),
('female');

INSERT INTO employees
(company_id, employee_full_name, employee_first_name, employee_last_name, role_id, employee_email, employee_hashed_password, employee_username, employee_picture)
VALUES
(1, 'John Smith', 'John', 'Smith', 1, 'johnsmith@me.com', 'password', 'jsmith', ''),
(1, 'Donna Schmiphflingherr', 'Donna', 'Schmiphflingherr', 1, 'degs@gmail.com"', 'password', 'Degs', 'https://img.etsystatic.com/il/8f3c6d/818346854/il_570xN.818346854_r3b9.jpg?version=0');

INSERT INTO patients
(company_id, patient_full_name, patient_first_name, patient_last_name, patient_gender, patient_address, patient_phone_number, patient_email, patient_emergency_contact_name, patient_emergency_contact_number, patient_emergency_contact_relationship )
VALUES
(1, 'Test Patient', 'Test', 'Patient', 1, '123 Test Address Alpine, Utah 84004', '0123456789', 'test@patient.com', 'Test Emergency Contact', 1234567890, 'Test Relationship'),
(1, 'Jonathan Smith', 'Jonathan', 'Smith', 1, '789 W 098 S, Provo, Utah 84084', '56798712367', 
'jonsmith@patient.com', 'Mojo jojo', '5679834567', 'Buddy'),
(1, 'Melanie Jones', 'Melanie', 'Jones', 2, 'West Stream Road 45 N, Payson, Utah 84004', '8013458765',
'mj@email.com', 'Superman', '8012331234', 'Local super hero'),
(1, 'Becky Johnson', 'Becky', 'Johnson', 2, '12678 S 4800 W, Riverton, Utah, 84090', '4359871735',
'becky@myemail.com', 'Pepper', '8013458765', 'Talking dog');

INSERT INTO conditions
(condition_name)
VALUES
('Asthma'),
('Arthritis'),
('Hypertension'),
('Bronchitis'),
('Coronary Heart Disease'),
('Hypothyroidism'),
('Pancreatitis'),
('Allergies'),
('Bunion'),
('Chest pain'),
('Chickenpox');

INSERT INTO patient_conditions
( patient_id, condition_id)
VALUES
(1, 1);

INSERT INTO allergies
(allergy_name)
VALUES
('Peanuts'),
('Soy'),
('Tree nuts'),
('Egg'),
('Dairy'),
('Fish'),
('Shellfish'),
('Gluten'),
('Penicillin'),
('Aspirin'),
('Anticonvulsants')
;

INSERT INTO patient_allergies
(patient_id, allergy_id)
VALUES
(1, 1);

INSERT INTO medications
(medication_name)
VALUES
('Albuterol'),
('Levothyroxine'),
('Rosuvastatin'),
('Esomeprazole'),
('Fluticasone'),
('Insulin Glargine');

INSERT INTO patient_medications
(medication_id, patient_id, medication_side_effects)
VALUES(1, 1, 'shaky');

INSERT INTO medical_devices
(medical_device_name)
VALUES
('Pacemaker'),
('Walker'),
('Cruthces'),
('Adjustable Gastric Band'),
('Nebulizer'),
('Inhaler'),
('Stent')
;

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
(visit_type_id, patient_id, employee_id, patient_visit_note, patient_visit_reason, patient_visit_date)
VALUES
(1, 1, 1, 'This was a great visit and I totally loved it!', 'Im 85 and dont have anyhting else to do.', '2018-06-27T15:00:00.000Z'),
(1, 1, 1, null, 'Flu', '2018-07-15T15:00:00.000Z'),
(1, 1, 1, null, 'Twisted Ankle', '2018-07-10T15:00:00.000Z');

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