module.exports = function addRachelEndpointsTo(app) {
    app.get('/patients', getPatients);
}


function getPatients(req, res) {
    console.log('hit patients list')

    req.db.all_patients()
        .then((patients) => res.status(200).send(patients))
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get all_patients") });
}
