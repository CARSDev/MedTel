//DEPENDENCIES
const express = require('express');
//MIDDLEWARES
const { default: applyMiddlewaresTo } = require('./middlewares');
//CONTROLLERS
const addAllEndpointsTo = require('./endpoints');
//DATABASE
const connectDbTo = require('./database');
//ENV
require('dotenv').config();

const {
  SERVER_PORT,
  
} = process.env

//APP
const app = express();

//EXPRESS STATIC
app.use(express.static(__dirname + '/../build'));

//MIDDLEWARES
applyMiddlewaresTo(app);

//DB
connectDbTo(app);

//ENDPOINTS
addAllEndpointsTo(app);

//SERVE REACT
// const path = require('path');
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

//LISTEN
app.listen(SERVER_PORT, console.log(`🏥 💉  Saving lives on port ${SERVER_PORT} 💉 🏥`))
