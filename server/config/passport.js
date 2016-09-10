var LocalStrategy = require('passport-local').Strategy;
var User = require('../users/user.js');

module.exports = function(passport) {

  //passport session setup for persistent login session

  // serialize user for session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //*************************************************
  // LOCAL SIGNUP ***********************************
  //*************************************************

  // Set-up for local strategy signup
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordfield: 'password',
    passReqToCallback : true,
  },
  function(req, username, password, done) {
    // needed for User.findOne to work
    process.nextTick(function() {

      User.findOne({ 'local.username' : username }, function(err, user) {
        if (err) {
          return done(err);
        }

        // check if username exists
        if (user) {
          console.log('user exists');
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {

          // no user with that username, create user
          var newUser = new User();

          //set up credentials
          newUser.local.username = username;
          newUser.generateHash(password, function (hash) {
            newUser.local.password = hash;
            newUser.save(function(err) {
              if(err) {
                throw err;
              }
              return done(null, newUser);
            });

          });

        }
      });
    });
  }));


  //*************************************************
  // LOCAL LOGIN ***********************************
  //*************************************************

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {

    User.findOne({'local.username' : username }, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found!'));
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect password!'));
      }
      return done(null, user);
    });
  }));

  //*************************************************
  // FUTURE FACEBOOK, GOOGLE, GITHUB LOGIN ***********************************
  //*************************************************

};
