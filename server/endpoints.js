const addAuthEndpointsTo = require('./controllers/auth');
const addRachelEndpointsTo = require('./controllers/rachel_controller');
const addShanEndpointsTo = require('./controllers/shan')

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)
    addRachelEndpointsTo(app)
    addShanEndpointsTo(app)
}