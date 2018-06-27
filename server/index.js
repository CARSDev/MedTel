<<<<<<< HEAD
require('dotenv').config()
  const express = require('express')
      , session = require('express-session')
      , bodyParser = require('body-parser')
      , massive = require('massive')

const pc = require('./controllers/patients_controller');

const {
  SERVER_PORT,
  CONNECTION_STRING,

} = process.env

const app = express()

app.use(bodyParser.json())
=======
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
>>>>>>> master

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

massive(CONNECTION_STRING).then((db) => {
  app.set('db', db)
  console.log('Connected to database')
})

<<<<<<< HEAD

////////////Endpoints////////////////
app.get('/patients', pc.all_patients);
=======
//SERVE REACT
// const path = require('path');
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

//LISTEN
app.listen(process.env.SERVER_PORT, console.log(`🏥 💉  Saving lives on port ${process.env.SERVER_PORT} 💉 🏥`))
>>>>>>> master
