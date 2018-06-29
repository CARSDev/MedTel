module.exports = function addShanEndpointsTo(app) {
    app.get('/schedule/:morning/:night', getSchedule)
    app.post('/appointment', addAppointment)
}

function getSchedule(req, res) {
    const { morning, night } = req.params
    console.log(morning, night)
    req.db.selected_date_schedule([morning, night]).then(schedule => {
        console.log(schedule)
    res.status(200).send(schedule)
    })
}

function addAppointment(req, res) {
    const { utc_time, id, reason } = req.body
    req.db.add_appointment([id, utc_time, reason]).then(appts =>
    res.status(200).send())
}