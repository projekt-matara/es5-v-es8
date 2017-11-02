const Promise = require('bluebird')
const config = require('../config')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))
const User = require('../model/Model').User

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
exports.getRandomInt = getRandomInt

exports.generateJwt = payloadInfo => {
 	const payload = payloadInfo
  const opts = {expiresIn: '1h'}
 	return jwt.signAsync(payload, config.secret, opts)
}

exports.uid = len => {
  const buf = []
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charlen = chars.length

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)])
  }

  return buf.join('')
}