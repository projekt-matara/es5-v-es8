var config = require('../config')
var jwt = Promise.promisifyAll(require('jsonwebtoken'))
var User = require('../model/Model').User

exports.generateJwt = function (userId) {
  var payload = {id: userId}
  var opts = {expiresIn: '1h'}
  return jwt.sign(payload, config.secret, opts)
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

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/*
  * Return a random int, used by `utils.uid()`
  * Meant for external use for the rest of the app services
  *
  * @param {Number} min
  * @param {Number} max
  * @return {Number}
  * @api private
*/

exports.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/*
* Return a JWT with necessary ID information
*
* @param {String} userId
* @return {String}
*/
exports.generateJwt = function (payloadInfo) {
  var payload = payloadInfo,
   opts = {expiresIn: '1h'}
  return jwt.sign(payload, config.secret, opts)
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
exports.uid = function (len) {
  var buf = []
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  var charlen = chars.length

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)])
  }

  return buf.join('')
}