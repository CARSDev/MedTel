module.exports = function addRachelEndpointsTo(app) {
    app.get('/patients', getPatients);
    app.get('/condition/:id', getPatientConditions);
    app.get('/conditions', getConditions);
    
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
            // console.log(patients)
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_conditions") });
}

function addCondition(req, res) {
    console.log('hit patients list')
    const { params } = req;

    req.db.add_condition([params.id, condition_id, condition_date_diagnosed])
        .then((conditions) => {
            // console.log(patients)
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_conditions") });
}