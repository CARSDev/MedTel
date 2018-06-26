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






massive(CONNECTION_STRING).then((db) => {
  app.set('db', db)
  console.log('Connected to database')
  app.listen(SERVER_PORT, console.log(`🏥 💉  Saving lives on port ${SERVER_PORT} 💉 🏥`))
})


////////////Endpoints////////////////
app.get('/patients', pc.all_patients);