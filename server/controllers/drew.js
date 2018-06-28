module.exports = function addDrewEndpointsTo(app) {
    app.get('/api/visits/:id', getPatientVisits);

    app.put('/api/visits/:id', updateVisit);
}

function getPatientVisits(req, res) {
    let { id } = req.params
    req.db.get_patient_visits([id])
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