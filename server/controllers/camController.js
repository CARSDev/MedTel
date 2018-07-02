
module.exports = function addCamEndpointsTo(app) {
  app.get("/employee", getEmployee),
  app.get('/patient/:id', getPatient),
  app.get('/patient/measurements/:id', getPatientMeasurements) 
  app.get('/visit/:id/:date', getAppts)
}

function getEmployee(req, res) {
  // console.log('backend hit')
  req.db.get_employee_info([req.user.employee_id])
    .then(info => {
      res.status(200).send(info);
    })
    .catch(() => {
      res.status(500).send();
    });
};

function getPatient(req, res) {
  let { id } = req.params
  req.db.get_patient([id])
    .then((patient) => {
      res.status(200).send(patient)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

function getPatientMeasurements(req, res) {
  let { id } = req.params
  req.db.get_patient_measurements([id])
    .then((measurements) => {
      res.status(200).send(measurements)
    })
    .catch((err) => {
      res.status(500).send(err)
  })
}

function getAppts(req, res) {
  let { id, date } = req.params
  req.db.get_appts([id, date])
    .then((appts) => {
      // console.log(appts)
      res.status(200).send(appts)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
