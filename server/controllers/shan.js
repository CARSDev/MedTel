module.exports = function addShanEndpointsTo(app) {
    app.get('/schedule/:morning/:night', getSchedule)
}

function getSchedule(req, res) {
    const { morning, night } = req.params
    console.log(morning, night)
    req.db.selected_date_schedule([morning, night]).then(schedule => {
        console.log(schedule)
    res.status(200).send(schedule)
    })
}