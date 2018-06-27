CREATE TABLE companies(
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(250),
    company_logo VARCHAR(2000)
);

CREATE TABLE roles(
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(250)
);

CREATE TABLE employees(
    employee_id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(company_id),
    employee_full_name VARCHAR(500),
    employee_first_name VARCHAR(250),
    employee_last_name VARCHAR(250),
    employee_picture VARCHAR(2000),
    role_id INTEGER REFERENCES roles(role_id),
    employee_hashed_password VARCHAR(1000),
    employee_email VARCHAR(250),
    employee_username VARCHAR(250)
);

CREATE TABLE genders(
    gender_id SERIAL PRIMARY KEY,
    gender_name VARCHAR(25)
);

CREATE TABLE patients(
    patient_id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(company_id),
    patient_full_name VARCHAR(500),
    patient_first_name VARCHAR(250),
    patient_last_name VARCHAR(250),
    patient_picture VARCHAR(2000),
    patient_birthday TIMESTAMPTZ,
    patient_gender INTEGER REFERENCES genders(gender_id),
    patient_address VARCHAR(1000),
    patient_phone_number VARCHAR(250),
    patient_email VARCHAR(250),
    patient_emergency_contact_name VARCHAR(250),
    patient_emergency_contact_number VARCHAR(250),
    patient_emergency_contact_relationship VARCHAR(250),
    patient_emergency_contact_name2 VARCHAR(250),
    patient_emergency_contact_number2 VARCHAR(250),
    patient_emergency_contact_relationship2 VARCHAR(250)
);

CREATE TABLE conditions(
    condition_id SERIAL PRIMARY KEY,
    condition_name VARCHAR(500)
);

CREATE TABLE patient_conditions(
    patient_condition_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    condition_id INTEGER REFERENCES conditions(condition_id),
    condition_date_diagnosed TIMESTAMPTZ
);

CREATE TABLE allergies(
    allergy_id SERIAL PRIMARY KEY,
    allergy_name VARCHAR(500)
);

CREATE TABLE patient_allergies(
    patient_allergy_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    allergy_id INTEGER REFERENCES allergies(allergy_id),
    allergy_date_diagnosed TIMESTAMPTZ
);

CREATE TABLE medications(
    medication_id SERIAL PRIMARY KEY,
    medication_name VARCHAR(500)
);

CREATE TABLE patient_medications(
    patient_medication_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    medication_id INTEGER REFERENCES medications(medication_id),
    medication_date_prescribed TIMESTAMPTZ,
    medication_side_effects VARCHAR(5000)
);

CREATE TABLE medical_devices(
    medical_device_id SERIAL PRIMARY KEY,
    medical_device_name VARCHAR(500)
);

CREATE TABLE patient_medical_devices(
    patient_medical_device_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    medical_device_id INTEGER REFERENCES medical_devices(medical_device_id),
    medical_device_date_administered TIMESTAMPTZ
);

CREATE TABLE family_history(
    family_history_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    condition_id INTEGER REFERENCES conditions(condition_id),
    family_history_relationship VARCHAR(250)
);

CREATE TABLE visit_types(
    visit_type_id SERIAL PRIMARY KEY,
    visit_type_name VARCHAR(250)
);

CREATE TABLE patient_visits(
    patient_visit_id SERIAL PRIMARY KEY,
    visit_type_id INTEGER REFERENCES visit_types(visit_type_id),
    patient_id INTEGER REFERENCES patients(patient_id),
    employee_id INTEGER REFERENCES employees(employee_id),
    patient_visit_date TIMESTAMPTZ,
    patient_visit_note_time_recorded TIMESTAMPTZ,
    patient_visit_note VARCHAR(10000)
);

CREATE TABLE available_tests(
    test_id SERIAL PRIMARY KEY,
    test_name VARCHAR(250)
);

CREATE TABLE lab_results(
    lab_result_id SERIAL PRIMARY KEY,
    test_id INTEGER REFERENCES available_tests(test_id),
    patient_id INTEGER REFERENCES patients(patient_id),
    lab_result FLOAT,
    lab_date TIMESTAMPTZ
);

CREATE TABLE imaging_results(
    imaging_result_id SERIAL PRIMARY KEY,
    test_id INTEGER REFERENCES available_tests(test_id),
    patient_id INTEGER REFERENCES patients(patient_id),
    imaging_result VARCHAR(5000),
    imaging_date TIMESTAMPTZ,
    imaging_pictures VARCHAR(5000)
);

CREATE TABLE reported_data(
    reported_data_id SERIAL PRIMARY KEY,
    test_id INTEGER REFERENCES available_tests(test_id),
    patient_id INTEGER REFERENCES patients(patient_id),
    reported_data FLOAT,
    reported_date TIMESTAMPTZ
);
