const addAuthEndpointsTo = require('./controllers/auth');
const addShanEndpointsTo = require('./controllers/shan')

module.exports = function addAllEndpointsTo(app) {
    //AUTHENTICATION
    addAuthEndpointsTo(app)
    addShanEndpointsTo(app)
}