var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configDB = require('./database.js');
var compression = require('compression');

module.exports = function(app, express) {
  app.use(compression());
  app.use(morgan('dev'));

  // configuration
  mongoose.connect(configDB.url); //connect to database

  require('./passport.js')(passport);

  app.use(morgan('dev')); // log every request to console
  app.use(cookieParser()); //reads cookies for auth
  // app.use(bodyParser); // get information from html forms
  app.use(bodyParser.json());

  // serves static files
  app.use(express.static(__dirname + '/../../client'));

  //passport requirements
  app.use(session({ secret: 'ilovefridgelyitisthebest' }));
  app.use(passport.initialize());
  app.use(passport.session()); //persistent login sess
  app.use(flash()); //flash messages in sessions

};

