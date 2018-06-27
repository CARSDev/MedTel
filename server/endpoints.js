const addAuthEndpointsTo = require('./controllers/auth');
const addDrewEndpointsTo = require('./controllers/drew');

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)

    //DREW
    addDrewEndpointsTo(app)

}