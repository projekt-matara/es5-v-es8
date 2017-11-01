// import models
var User = require('../model/Model').User
var Task = require('../model/Model').Task

// get all tasks for specific user
exports.getUserTasks = function (req, res) {
  // grab username
  var username = req.params.username
  // find user by username
  User.findOne({username: username}, function (err, user) {
    if (err) {
      console.log(err)
    } else {
      var taskList = []
      for (var i = 0; i < user.tasks.length; i++) {
        Task.findById(id, function (err, newTask) {
          if (err) {
            console.log(err)
          } else {
            taskList.push(newTask)
          }
        })
      }
      // send array of tasks to user
      res.send(taskList)
    }
  })
}

// create new task
exports.createTask = function (req, res) {
  // get username and taskname info
  var username = req.body.username
  var taskname = req.body.taskname
  // find user by username to get the id
  User.findOne({username: username}, function (err, user) {
    if (err) {
      console.log(err)
    } else {
      // create Task
      Task.create({name: taskname, user: user.id}, function (err, newTask) {
        if (err) {
          console.log(err)
        } else {
          // send success signal
          res.json({taskname: newTask.nameid, id: newTask.id})
        }
      })
    }
  })
}

// edit task
exports.editTask = function (req, res) {
  // grab the taskid and taskname
  var taskId = req.body.taskId
  var newTaskName = req.body.newTaskName
  // find the task and update it
  Task.findByIdAndUpdate(taskId, {name: newTaskName}, function (err, task) {
    if (err) {
      console.log(err)
    } else {
      // send success signal
      res.status(200).send('success')
    }
  })
}

// delete task
exports.deleteTask = function (req, res) {
  // grab username and taskname
  var username = req.params.username
  var taskId = req.params.taskId
  // get the user
  User.findOne({username: username}, function (err, user) {
    if (err) {
      console.log(err)
    } else {
      // delete Task 
      Task.findByIdAndRemove({taskId: taskId}, function (err, deadTask) {
        if (err) {
          console.log(err)
        } else {
          // edit User
          User.findOneAndUpdate({username: username}, {$pull: {tasks: {$in: [taskId]}}}, function (err, editUser) {
            if (err) {
              console.log(err)
            } else {
              // send success signal
              res.status(200).send('success')
            }
          })
        }
      })
    }
  })
}