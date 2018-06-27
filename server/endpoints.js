const addAuthEndpointsTo = require('./controllers/auth');
const addCamEndpointsTo = require('./controllers/camController')

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)
    addCamEndpointsTo(app)

}