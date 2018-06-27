const bodyParser = require('body-parser');
const session = require('express-session');

exports.default = function addMiddlewaresTo(app) {
    
    //BODY PARSER
    app.use(bodyParser.json());

    //DATABASE
    app.use((req, res, next) => {
        const db = req.app.get('db');
        req.db = db;
        next();
    });

    //SESSION
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));

    //DESERIALIZE
    app.use((req, res, next) => {
        console.log('hit deserialize');
        let user_id = req.session.user;
        if (user_id) {
            console.log('Getting user' + user_id);
            req.db.read_user([user_id])
                .then(user => {
                    console.log(user.employee_id, user.company_id, user.role_id);
                })
            
        } else {
            console.log('no user_id')
            next();
        }
    });

}