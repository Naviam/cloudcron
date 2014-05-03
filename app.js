var express = require('express');
var app = express();
var routes = require('./routes')(app);

app.use(express.static(__dirname + '/public'));
app.use('/static',  express.static(__dirname + '/bower_components'));

var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
	done(err, user);
  }
));

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});