var express = require('express');
// var request = require('request');
// var config = require('./env/config');

var app = express();

// middleware
require('./config/middleware')(app, express);

// routes
require('./config/routes')(app);

var port = process.argv[2] || 8080;
app.listen(port, function () {
  console.log('App listening on port ' + port +' !');
});