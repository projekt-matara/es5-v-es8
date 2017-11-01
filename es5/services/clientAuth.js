/*
* Passport configuration happens here.
*/

var passport = require('passport')
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy
var Client = require('../model/Model').Client

/*
* Authenticate a client using the Client/Password strategy and passing the
* login info in the request body.
*/
passport.use('clientPassword', new ClientPasswordStrategy(function (clientId, clientSecret, done) {
  // find the client by their id
  Client.findOne({clientId: clientId}, function (err, client) {
    // handle errors
    if (err) return done(err)
    if (!client) return done(null, false)
        // make sure the client is TRUSTED
    if (!client.trustedClient) return done(null, false)
        // if the clientSecrets match, return done
    if (client.clientSecret == clientSecret) return done(null, client)
    else return done(null, false)
  })
}))
