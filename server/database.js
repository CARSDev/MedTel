const massive = require('massive');
const axios = require('axios');

module.exports = function (app) {
    massive(process.env.CONNECTION_STRING)
        .then(db => {
            console.log('Connected to database')
            app.set('db', db);
        })
        .catch(err => {
            console.error('Database error');
            console.error(err);
        })
}