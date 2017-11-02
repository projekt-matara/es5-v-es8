var config = require('../config')
var jwt = require('jsonwebtoken')
var User = require('../model/Model').User

exports.generateJwt = function (userId) {
  var payload = {id: userId}
  var opts = {expiresIn: '1h'}
  return jwt.sign(payload, config.secret, opts)
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.getRandomInt = getRandomInt

exports.generateJwt = function (payloadInfo) {
  var payload = payloadInfo,
   opts = {expiresIn: '1h'}
  return jwt.sign(payload, config.secret, opts)
}

exports.uid = function (len) {
  var buf = []
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  var charlen = chars.length

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)])
  }

  return buf.join('')
}