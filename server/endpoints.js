const addAuthEndpointsTo = require('./controllers/auth');
const addDrewEndpointsTo = require('./controllers/drew');
const addShanEndpointsTo = require('./controllers/shan')

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)

    //DREW
    addDrewEndpointsTo(app)

    addShanEndpointsTo(app)
}