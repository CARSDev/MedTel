const addAuthEndpointsTo = require('./controllers/auth');
const addDrewEndpointsTo = require('./controllers/drew');
const addRachelEndpointsTo = require('./controllers/rachel_controller');
const addShanEndpointsTo = require('./controllers/shan')

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)

    //DREW
    addDrewEndpointsTo(app)

    addRachelEndpointsTo(app)
    
    addShanEndpointsTo(app)
}