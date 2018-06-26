module.exports = {
    all_patients: (req, res, next) => {
        const dbInstance = req.app.get('db');
        dbInstance.all_patients()
        .then((patients)=>res.status(200).send(patients))
        .catch((e) => { console.log(e); res.status(500).send("Couldn't get all_patients")});
    }
}