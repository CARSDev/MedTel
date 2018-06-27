const addAuthEndpointsTo = require('./controllers/auth');
const addCamEndpointsTo = require('./controllers/camController')
const addShanEndpointsTo = require('./controllers/shan')

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)
    addCamEndpointsTo(app)

    addShanEndpointsTo(app)
}