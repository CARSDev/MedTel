module.exports = function addCamEndpointsTo(app) {
  app.get("/employee", getEmployee),
    app.get("/patient/:id", getPatient),
    app.get("/patient/measurements/:id", getPatientMeasurements);
  app.get("/visit/:id/:date", getAppts),
    app.put("/patient/:id", editPatient);
};

function getEmployee(req, res) {
  // console.log('backend hit')
  req.db
    .get_employee_info([req.user[0].employee_id])
    .then(info => {
      res.status(200).send(info);
    })
    .catch(() => {
      res.status(500).send();
    });
}

function getPatient(req, res) {
  let { id } = req.params;
  req.db
    .get_patient([id])
    .then(patient => {
      res.status(200).send(patient);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function getPatientMeasurements(req, res) {
  let { id } = req.params;
  req.db
    .get_patient_measurements([id])
    .then(measurements => {
      res.status(200).send(measurements);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function getAppts(req, res) {
  let { id, date } = req.params;
  req.db
    .get_appts([id, date])
    .then(appts => {
      // console.log(appts)
      res.status(200).send(appts);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function editPatient(req, res) {
  let { id } = req.params;
  let {
    patient_first_name,
    patient_last_name,
    patient_birthday,
    patient_gender,
    patient_height,
    patient_weight,
    patient_address,
    patient_phone_number,
    patient_email,
    patient_emergency_contact_name,
    patient_emergency_contact_relationship,
    patient_emergency_contact_number,
    patient_emergency_contact_name2,
    patient_emergency_contact_relationship2,
    patient_emergency_contact_number2
  } = req.body;
  // console.log(req.body)
  let patient_full_name = `${patient_first_name} ${patient_last_name}`
  req.db
    .edit_patient([
      patient_first_name,
      patient_last_name,
      patient_birthday,
      patient_gender,
      patient_height,
      patient_weight,
      patient_address,
      patient_phone_number,
      patient_email,
      patient_emergency_contact_name,
      patient_emergency_contact_relationship,
      patient_emergency_contact_number,
      patient_emergency_contact_name2,
      patient_emergency_contact_relationship2,
      patient_emergency_contact_number2,
      id,
      patient_full_name
    ])
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err);
    });
}
