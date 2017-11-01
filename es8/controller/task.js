// import core modules
const Promise = require('bluebird')

// import models
const User = Promise.promisifyAll(require('../model/Model').User)
const Task = Promise.promisifyAll(require('../model/Model').Task)

// get all tasks for specific user
exports.getUserTasks = async ctx => {
  // grab username
  const username = ctx.params.username
  // find user by username
  const user = await User.findOneAsync({username})
  if (!user) {throw new Error('User not found')}
  // setup empty array then fill it with all the tasks from the User
  let x = []
  for (let id of user.tasks) {
    const newTask = await Task.findByIdAsync({id})
    if (!newTask) {throw new Error('Task not found.')}
    x.push(newTask)
  }
  // send array of tasks out to the user. 
  ctx.body = x
}

// create new task
exports.createTask = async ctx => {
  // get username and taskname info
  const {username, taskname} = ctx.request.body
  // find user by username to get the id
  const user = await User.findOneAsync({username})
  if (!user) {throw new Error('User not found')}
  // create task
  const newTask = await Task.createAsync({name: taskname, user: user.id})
  if (!newTask) {throw new Error('Task failed to create.')}
  // send success signal
  ctx.body = {taskname: newTask.name, id: newTask.id}
}

// edit task
exports.editTask = async ctx => {
  // grab the taskId, and new taskname
  const {taskId, newTaskName} = ctx.request.body
  // Find the task and update it
  const editTask = await Task.findByIdAndUpdateAsync(taskId, {name: newTaskName})
  if (!editTask) {throw new Error('Failed to update task.')}
  // send success signal
  ctx.status = 200
  ctx.body = 'success'
}

// delete task
exports.deleteTask = async ctx => {
  // grab the username and taskname
  const {username, taskId} = ctx.params
  // get the user
  const user = await User.findOneAsync({username})
  if (!user) {throw new Error('User not found')}
  // delete Task and edit User in parallel operation
  const deadTask = Task.findByIdAndRemoveAsync(taskId)
  const editUser = User.findOneAndUpdateAsync({username}, {$pull: {tasks: {$in: [taskId]}}})
  const [dt, eu] = await Promise.all([deadTask, editUser])
  if (!dt || !eu) {throw new Error('Agh! Failed to delete user.')}
  // // send success signal
  ctx.status = 200
  ctx.body = 'success'
}