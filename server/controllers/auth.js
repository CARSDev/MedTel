const bcrypt = require('bcryptjs');

module.exports = function addAuthEndpointsTo(app) {
    app.post('/auth/adduser', addUser);
    
    app.post('/auth/login', login);

    app.get('/auth/logout', logout);
}

function addUser(req, res) {
    
    const { first_name, last_name, role_id, email, username, password } = req.body;
    // const { company_id } = req.user;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            req.db.register_user([first_name, last_name, `${first_name} ${last_name}`, role_id, email, username, hash]).then(()=> {
                res.status(200).send()
            }).catch(e => { res.status(500).send(e) });
        })
    })


}

function login(req, res) {

    let { username, password } = req.body;

    req.db.read_password({ username })
        .then(([{ employee_hashed_password, employee_id }]) => {
            bcrypt.compare(password, employee_hashed_password, (err, result) => {
                if (err) {
                    res.status(500).send(err)
                }
                else if (result) {
                    req.db.read_user([employee_id]).then(user => {
                        req.session.user = user[0].employee_id
                        user[0].employee_hashed_password = ''
                        res.status(200).send(user)
                    }).catch(err => {
                        res.status(200).send(err)
                    })
                }
            })
        } )
}

function logout(req, res) {
    req.session.destroy()
    res.sendStatus(200)
}