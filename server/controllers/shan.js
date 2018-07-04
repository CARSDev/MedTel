const bcrypt= require('bcryptjs')

module.exports = function addShanEndpointsTo(app) {
    app.get('/schedule/:morning/:night', getSchedule)
    app.post('/appointment', addAppointment)
    app.put('/appointment', editAppointment)
    app.delete('/appointment/:id', deleteAppointment)
    app.get('/employees', getEmployees)
    app.post('/employee', addEmployee)
    app.put('/employee/:id', updateEmployee)
    app.delete('/employee/:id', deleteEmployee)

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

function getEmployees(req, res) {
    req.db.get_employees().then(emps =>
    res.status(200).send(emps))
}

function addEmployee(req, res) {
    let { first, last, picture, role, username, password, email } = req.body
    let full = `${first} ${last}`
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // console.log(hash)
            console.log(full, first, last, picture, role, username, hash, email)
            req.db.add_employee([full, first, last, picture, role, username, hash, email]).then(()=>res.status(200).send())
        })
    })
}

function updateEmployee(req, res) {
    let { id } = req.params
    let { first, last, picture, role, username, email } = req.body
    let full = `${first} ${last}`
    req.db.edit_employee([id, full, first, last, picture, role, username, email]).then(()=>res.status(200).send())
}

function deleteEmployee(req, res) {
    let { id } = req.params
    req.db.delete_employee([id]).then(()=>res.status(200).send())
}