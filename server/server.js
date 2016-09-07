var express = require('express');
var app = express();

// middleware
require('./config/middleware.js')(app, express);

// routes
require('./config/routes.js')(app);

var port = process.argv[2] || 8080;
app.listen(port, function () {
  console.log('App listening on port ' + port +' !');
});

