const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const logger = require('morgan')

const bodyParser = require('body-parser')

// MONGODB SETUP
// brew install MONGODB
// mongod to start server
// sudo mkdir -p data/db
// sudo chown -R toneloke ./data/db
const mongoose = require('mongoose')
// establish a connection to the database
mongoose.connect('mongodb://localhost/movie-times', err => {
  if (err) {
    console.log('error connecting to mongodb:', err)
  } else {
    console.log('successfully connecting to mongodb cars db')
  }
})
app.use(express.static(__dirname + '/public'))
// using 3rd party middleware
app.use(logger('dev'))
// use the body-parser middleware to access req.body
// parse application/json
app.use(bodyParser.json())
// make routes availble to client
const moviesRouter = require('./routes')
app.use('/api/v1', moviesRouter)
// run your server to listen on a given port

app.listen(port, (err) => {
  // check for an error when communicating with the server
  if (err) {
    console.log('server failed to start', err)
  } else {
    console.log(`You're connected to port: ${port}`)
  }
})
