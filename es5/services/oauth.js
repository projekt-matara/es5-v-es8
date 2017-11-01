/*
* OAuth2orize token exchanges are defined here.
* In this case, you are using the Password Exchange Flow
* and the Refresh Token Exchange Flow
*/

// load modules
var oauth2orize = require('oauth2orize')
var Client = require('../model/Model').Client
var User = require('../model/Model').User
var jwt = require('jsonwebtoken')
var crypto = require('crypto')
var fs = require('fs')
var passport = require('passport')
var bcrypt = require('bcrypt-nodejs')
var utility = require('../services/utility')
var config = require('../config')

/*
*   Config OAuth2orize
*/
// create OAuth 2.0 server
var server = oauth2orize.createServer()

// Password exchange flow
server.exchange(oauth2orize.exchange.password(async (client, username, password, scope) => {
  // generate refresh token
  var refreshToken = await utility.uid(256)
  // encrypt the refresh token
  var refreshTokenHash = crypto.createHash('sha1').update(refreshToken).digest('hex')
  
  // Find user by email
  var user = await User.findOneAsync({username: username})
  if (!user) {return false}
  // password check
  var passwordCompareResult = await bcrypt.compareAsync(password, user.password)
  if (!passwordCompareResult) {return false}
  // format the jwt data
  var payload = {
    name: user.username,
    userId: user.id,
    sub: user.username,
    aud: 'todo-list',
    issuer: 'todo-list',
    role: user.role,
    clientId: client.clientId
  }
  // create jwt
  var token = await jwt.signAsync(payload, config.secret, {expiresIn: '1h'})
  if (!token) {return false} 
  // send jwt
  return token
}))

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope) {
  // generate refresh token
  utility.uid(256, function (err, refreshToken) {
    if (err) {
      console.log(err)
    } else {
      // encrypt the refresh token
      var refreshTokenHash = crypto.createHash('sha1').update(refreshToken).digest('hex')
    }
  })
}))

// token endpoint
exports.token = [
  passport.authenticate(['clientBasic', 'clientPassword'], { session: false }),
  server.token(),
  server.errorHandler()
]

exports.server = server