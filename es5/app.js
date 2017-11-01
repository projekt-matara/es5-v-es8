// import core modules
var express = require('express')
var mongoose = require('mongoose')
var config = require('./config')

// import authentication modules
var passport = require('passport')
var jwt = require('express-jwt')
require('./services/clientAuth')
var authServer = require('./services/oauth').server

// import middlewares
var bodyParser = require('body-parser')
var http = require('http')

// import models
var Client = require('./model/Model').Client

// import controllers
var task = require('./controller/task')
var user = require('./controller/user')

// initialize server
var app = express()

/*
  function that checks if a Client exists in the database for the imaginary dashboard
*/
function clientCheck () {
  Client.findOne({name: 'ToDo Dashboard'}, function (err, client) {
    if (err) {
      console.log(err)
    } else if (!client) {
      console.log('no ToDo Dashboard client found, creating new one.')
      var createClientInfo = {
        name: 'ToDo Dashboard',
        clientId: 'my-awesome-clientid',
        clientSecret: 'my-awesome-clientSecret',
        trustedClient: true
      }
      Client.create(createClientInfo, function (err, createdClient) {
        if (err) {
          console.log('error creating dashboard client!')
        } else {
          console.log('new ToDo Dashboard Client created.')
        }
      })
    } 
  })
}

/*
  Configure Mongoose
*/
mongoose.connect(config.mongoUrl, {}, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('successfully connected to mongo database')
  }
})

/*
  Server Config
*/

// logger
app.use(function (req, res, next) {
  console.log('method: ' + req.method, 'url: ' + req.url)
  next()
})

// initialize passport 
app.use(passport.initialize())

// body parser
app.use(bodyParser.json())

// routing 
// create user
app.post('/user/new', user.createUser)
// get user by username
app.get('/user/:username', jwt({secret: config.secret}), user.getUser),
// delete user by username
app.delete('/user', jwt({secret: config.secret}), user.deleteUser),
// get user tasks
app.get('/task/:username', jwt({secret: config.secret}), task.getUserTasks),
// create new task
app.post('/task', jwt({secret: config.secret}), task.createTask),
// edit task
app.put('/task', jwt({secret: config.secret}), task.editTask),
// delete task
app.delete('/task/:username/:taskname', jwt({secret: config.secret}), task.deleteTask)

// start server
var server = http.createServer(app)

// port listener 
server.listen(3000, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('listening on port', 3000)
  }
})