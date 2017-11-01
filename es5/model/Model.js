var mongoose = require('mongoose')
var Schema = mongoose.Schema
var relationship = require('mongoose-relationship')

// USER Model
var UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, bcrypt: true},
  tasks: [{type: Schema.ObjectId, ref: 'Task'}]
})

// TASK Model
var TaskSchema = mongoose.Schema({
  name: String,
  user: {type: Schema.ObjectId, ref: 'User', childPath: 'tasks'}
})

// CLIENT Model
var ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
  trustedClient: { type: Boolean, required: true }
})

// Plugins
UserSchema.plugin(require('mongoose-unique-validator'))
UserSchema.plugin(require('mongoose-bcrypt'))
TaskSchema.plugin(relationship, {relationshipPathName: 'user'})
ClientSchema.plugin(require('mongoose-unique-validator'))

// Exports
exports.Task = mongoose.model('Task', TaskSchema)
exports.User = mongoose.model('User', UserSchema)
exports.Client = mongoose.model('Client', ClientSchema)