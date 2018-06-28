module.exports = function addRachelEndpointsTo(app) {
    app.get('/patients', getPatients);
    app.get('/condition/:id', getConditions);
}


function getPatients(req, res) {
    console.log('hit patients list')
    // console.log(req.db.all_patients);

    req.db.all_patients()
        .then((patients) => {
            // console.log(patients)
            res.status(200).send(patients)
            
        } )
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get all_patients") });
}

function getConditions(req, res) {
    console.log('hit conditions list')
    const { params } = req;

    req.db.get_conditions([params.id])
        .then((conditions) => {
            console.log(conditions)
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_conditions") });
}