const addAuthEndpointsTo = require('./controllers/auth');
const addRachelEndpointsTo = require('./controllers/rachel_controller');

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)
    addRachelEndpointsTo(app)
}