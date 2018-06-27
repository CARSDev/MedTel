const addAuthEndpointsTo = require('./controllers/auth');

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)

}