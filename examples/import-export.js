/*
  NOTE: Not supported in native Node.js yet. 
  However it's now entering experimental stage in 
  version 8.8.0

  If you want to use this, you will need Babel
*/

// normal CommonJS import
var fs = require('fs')
var http = require('http')
var User = require('./some/model/file').User
var Task = require('./some/model/file').Task

// imports with ES6 Modules
import fs from 'fs'
import http from 'http'
import {User, Task} from './some/model/file' // utilize destructuring to save space

// normal CommonJS exporting
module.exports.add = function (x, y) {
  return x + y
}

// exports using ES6 modules
export const subtract = function (x, y) {
  return x - y
}