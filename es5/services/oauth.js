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
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope) {
  // generate refresh token
  var refreshToken = utility.uid(256)
  // encrypt the refreshToken
  var refreshTokenHash = crypto.createHash('sha1').update(refreshToken).digest('hex')

  // find user by email
  User.findOne({username: username}, function (err, user) {
    if (!user) {
      return false
    } else {
      // password check
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return false
        } else {
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
          jwt.sign(payload, config.secret, {expiresIn: 'h1'}, function (err, jwt) {
            if (err) {
              return false
            } else {
              return jwt
            }
          })
        }
      })
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