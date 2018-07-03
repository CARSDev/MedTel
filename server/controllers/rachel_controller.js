module.exports = function addRachelEndpointsTo(app) {
    app.get('/patients', getPatients);
    //////////Conditions////////////////
    app.get('/conditions/:id', getPatientConditions);
    app.get('/conditions', getConditions);
    app.post('/condition/:id', addCondition);
    app.put('/condition/:id', updateCondition);
    ///////////Allergies//////////////////
    app.get('/allergies/:id', getPatientAllergies);
    app.get('/allergies', getAllergies);
    app.post('/allergy/:id', addAllergy);
    app.put('/allergy/:id', updateAllergy);
    ///////////Medical Devices//////////////////
    app.get('/devices/:id', getPatientDevices);
    app.get('/devices', getDevices);
    app.post('/device/:id', addDevice);
    app.put('/device/:id', updateDevice);
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

/////////////Conditions//////////////////////
function getPatientConditions(req, res) {
    // console.log('hit patient conditions list')
    const { params } = req;

    req.db.get_patient_conditions([params.id])
        .then((conditions) => {
            // console.log(conditions)
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
    // console.log('hit add condition')
    const { params } = req;
    const { condition_id, condition_date_diagnosed } = req.body

    req.db.add_condition([params.id, condition_id, condition_date_diagnosed])
        .then((conditions) => {
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_conditions") });
}

function updateCondition(req, res) {
    // console.log('hit update condition')
    const { params } = req;
    console.log(params.id)
    
    req.db.update_patient_condition([params.id])
        .then((conditions) => {
            res.status(200).send(conditions)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get update_patient_conditions") });
}
/////////////////Allergies///////////////////
function getPatientAllergies(req, res) {
    // console.log('hit patient conditions list')
    const { params } = req;

    req.db.get_patient_allergies([params.id])
        .then((allergies) => {
            // console.log(allergies)
            res.status(200).send(allergies)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_patient_allergies") });
}

function getAllergies(req, res) {
    req.db.get_allergies()
        .then((allergies) => {
            res.status(200).send(allergies)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_allergies") });
}

function addAllergy(req, res) {
    // console.log('hit add allergy')
    const { params } = req;
    const { allergy_id, allergy_date_diagnosed } = req.body

    req.db.add_allergy([params.id, allergy_id, allergy_date_diagnosed])
        .then((allergies) => {
            res.status(200).send(allergies)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_allergies") });
}

function updateAllergy(req, res) {
    // console.log('hit update allergy')
    const { params } = req;
    // console.log(params.id)

    req.db.update_patient_allergies([params.id])
        .then((allergies) => {
            res.status(200).send(allergies)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get update_patient_allergies") });
}

/////////////////Devices///////////////////
function getPatientDevices(req, res) {
    // console.log('hit patient conditions list')
    const { params } = req;

    req.db.get_patient_devices([params.id])
        .then((devices) => {
            // console.log(devices)
            res.status(200).send(devices)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_patient_devices") });
}

function getDevices(req, res) {
    req.db.get_devices()
        .then((devices) => {
            res.status(200).send(devices)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_devices") });
}

function addDevice(req, res) {
    // console.log('hit add device')
    const { params } = req;
    const { medical_device_id, medical_device_date_administered } = req.body

    req.db.add_device([params.id, medical_device_id, medical_device_date_administered])
        .then((devices) => {
            res.status(200).send(devices)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get get_devices") });
}

function updateDevice(req, res) {
    // console.log('hit update device')
    const { params } = req;
    // console.log(params.id)

    req.db.update_patient_devices([params.id])
        .then((devices) => {
            res.status(200).send(devices)

        })
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get update_patient_devices") });
}