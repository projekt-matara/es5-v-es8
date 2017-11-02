const Promise = require('bluebird')
const config = require('../config')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))
const User = require('../model/Model').User

exports.generateJwt = userId => {
 	const payload = {id: userId},
				opts = {expiresIn: '1h'}
 	return jwt.signAsync(payload, config.secret, opts)
}

/**
 * Return a random int, used by `utils.uid()`
 * Meant for internal use within this library only.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
exports.getRandomInt = getRandomInt

/*
*	Return a JWT with necessary ID information
*
* @param {String} userId
* @return {String}
*/
exports.generateJwt = (payloadInfo) => {
 	const payload = payloadInfo
  const opts = {expiresIn: '1h'}
 	return jwt.signAsync(payload, config.secret, opts)
}

/**
 * Return a unique identifier with the given `len`.
 *
 * utils.uid(10);
 * // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
exports.uid = (len) => {
  const buf = []
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charlen = chars.length

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)])
  }
  
  return buf.join('')
}