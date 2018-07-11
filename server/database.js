const massive = require('massive');
const axios = require('axios');

module.exports = function (app) {
    massive(process.env.CONNECTION_STRING)
        .then(db => {
            app.set('db', db);
        })
        .catch(err => {
        })
}