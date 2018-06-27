module.exports = function addShanEndpointsTo(app) {
    app.get('/schedule/:morning/:night', getSchedule)
}

function getSchedule(req, res) {
    const { morning, night } = req.params
    req.db.selected_date_schedule([morning, night]).then(schedule => {
    res.status(200).send(schedule)
    })
}