var express        = require('express');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var bodyParser     = require('body-parser');
var passport       = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

var app = express();
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
var io = require('socket.io').listen(server);


app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}));
app.use(bodyParser());
app.use(require('method-override')());

app.use(express.static(__dirname + '/public'));
app.use('/bower',  express.static(__dirname + '/bower_components'));
app.use('/npm',  express.static(__dirname + '/node_modules'));

var routes = require('./routes')(app);
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

io.sockets.on('connection', function (socket) {
  socket.emit('newJob', {
    title: 'Test socket',
    rrule: 'Weekly on Friday at 6am',
    createdDate: new Date(),
    lastRun: new Date("2014-04-11T06:00:00Z"),
    nextRun: new Date("2014-04-18T06:00:00Z"),
    isArchived: false,
    isActive: true
  });
  socket.on('newJob', function (data) {
    console.log(data);
  });
});