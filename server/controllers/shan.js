module.exports = function addShanEndpointsTo(app) {
    app.get('/schedule/:morning/:night', getSchedule)
    app.post('/appointment', addAppointment)
    app.put('/appointment', editAppointment)
    app.delete('/appointment/:id', deleteAppointment)
}

function getSchedule(req, res) {
    const { morning, night } = req.params
    // console.log(morning, night)
    req.db.selected_date_schedule([morning, night]).then(schedule => {
    res.status(200).send(schedule)
    })
}

function addAppointment(req, res) {
    const { utc_time, id, reason } = req.body
    req.db.add_appointment([id, utc_time, reason]).then(appts =>
    res.status(200).send())
}

function editAppointment(req, res) {
    const { id, reason } = req.body
    // console.log(id, reason)
    req.db.edit_appointment([id, reason]).then(appts =>
        res.status(200).send())
}

function deleteAppointment(req, res) {
    const { id } = req.params
    // console.log('req.params',req.params)
    // console.log(id)
    req.db.delete_appointment([id]).then(appts =>
    res.status(200).send())
}