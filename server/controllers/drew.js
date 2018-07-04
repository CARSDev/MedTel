module.exports = function addDrewEndpointsTo(app) {
    app.get('/api/visits/:id/:date', getPatientVisits);

    app.put('/api/visits/:id', updateVisit);

    app.post('/api/patients', addPatient);

    app.get('/api/labResults/:id', getLabResults);
    
    app.get('/api/imagingResults/:id', getImagingResults);
    
    app.get('/api/reported/:id', getReported);
}

function getPatientVisits(req, res) {
    let { id, date } = req.params
    req.db.get_patient_visits([id, date])
        .then((visits) => {
            res.status(200).send(visits)
        })
}

function updateVisit(req, res) {
    let { id } = req.params;
    let { patient_visit_reason, patient_visit_note} = req.body
    req.db.update_visit([id, patient_visit_reason, patient_visit_note])
        .then( () => res.sendStatus(200) )
}

function addPatient(req, res) {
    const { address, birthday, email, emergencyName, emergencyNumber, emergencyRelationship, firstName, gender, lastName, phone } = req.body;
    const { company_id } = req.user;
    let full_name = `${firstName} ${lastName}`
    req.db.add_patient([company_id, full_name, firstName, lastName, birthday, gender, address, phone, email, emergencyName, emergencyNumber, emergencyRelationship])
        .then( () => res.sendStatus(200) )
}

function getLabResults(req, res) {
    const { id } = req.params;
    req.db.get_lab_results([id])
        .then( (results) => res.status(200).send(results) )
}

function getImagingResults(req, res) {
    const { id } = req.params;
    req.db.get_imaging_results([id])
        .then((results) => res.status(200).send(results))
}

function getReported(req, res) {
    const { id } = req.params;
    req.db.get_reported([id])
        .then((results) => res.status(200).send(results))
}