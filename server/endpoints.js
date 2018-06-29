const addAuthEndpointsTo = require('./controllers/auth');
const addCamEndpointsTo = require('./controllers/camController')
const addDrewEndpointsTo = require('./controllers/drew');
const addRachelEndpointsTo = require('./controllers/rachel_controller');
const addShanEndpointsTo = require('./controllers/shan')

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)
    addCamEndpointsTo(app)


    //DREW
    addDrewEndpointsTo(app)

    addRachelEndpointsTo(app)
    
    addShanEndpointsTo(app)
}