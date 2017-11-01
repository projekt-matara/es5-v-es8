// import models
var User = require('../model/Model').User
var Task = require('../model/Model').Task

// get user by username
exports.getUser = function (req, res) {
  // grab user from database by username
  User.findOne({username: req.params.username}, function (err, user) {
    if (err) {
      console.log(err)
    } else {
      // grab task data for user.id
      Task.find({user: user.id}, function (err, taskList) {
        if (err) {
          console.log(err) 
        } else {
          // send proper user info in response
          res.json({username: user.username, tasks: taskList, id: user.id})
        }
      })
    }
  })
}

// create new user
exports.createUser = function (req, res) {
  // format needed data
  var username = req.body.username
  var password = req.body.password
  // create User
  User.create({username: username, password: password}, function (err, user) {
    if (err) {
      console.log(err)
    } else {
      // send response
      res.status(200).send('success')
    }
  })
}

// delete user by username
exports.deleteUser = function (req, res) {
  // get username
  var username = req.body.username
  // delete user by username
  User.findOneAndRemove({username: username}, function (err, deletedUser) {
    if (err) {
      console.log(err)
    } else {
      // send response if all goes well
      res.status(200).send('success')
    }
  })
}





