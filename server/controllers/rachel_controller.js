module.exports = function addRachelEndpointsTo(app) {
    app.get('/patients', getPatients);
    app.get('/condition/:id', getPatientConditions);
    app.get('/conditions', getConditions);
    app.post('/condition/:id', addCondition);
    app.put('/condition/:id', updateCondition);
}


function getPatients(req, res) {
    // console.log('hit patients list');
    // console.log(req.db.all_patients);

    req.db.all_patients()
        .then((patients) => {
            // console.log(patients)
            res.status(200).send(patients)
            
        } )
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get all_patients") });
}

function getPatientConditions(req, res) {
    // console.log('hit patient conditions list')
    const { params } = req;

    req.db.get_patient_conditions([params.id])
        .then((conditions) => {
            console.log(conditions)
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_patient_conditions") });
}

function getConditions(req, res) {
    req.db.get_conditions()
        .then((conditions) => {
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_conditions") });
}

function addCondition(req, res) {
    console.log('hit add condition')
    const { params } = req;

    req.db.add_condition([params.id, condition_id, condition_date_diagnosed])
        .then((conditions) => {
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_conditions") });
}

function updateCondition(req, res) {
    console.log('hit update condition')
    const { condition_id, condition_date_diagnosed, patient_condition_id } = req.body
    
    req.db.update_patient_condition([condition_id, condition_date_diagnosed, patient_condition_id])
        .then((conditions) => {
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get update_patient_conditions") });
}

function deleteCondition(req, res) {
    const { patient_condition_id } = req.body;
    req.db.delete_patient_condition([patient_condition_id])
        .then((conditions) => {
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get delete_patient_conditions") });
}