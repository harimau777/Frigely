var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// implement routes
routes(app, express); // this should run the routes

// serve static assets
app.use(express.static(__dirname + '/../client'));


/**
simulate database

var items = [];

var addItem = function(item) {
  var itemObj = {};
  if (item) {
    itemObj._id = items.length;
    itemObj.name = item;
    items.push(itemObj);
  }
};

// add array of items
var addItems = function(food) {
  food.forEach(function(item) {
    addItem(item);
  });
};

addItems(['carrots', 'potatoes', 'rice']);
**/


app.listen(8080, function () {
  console.log('App listening on port 8080!');
});

// added in an exports.module line here
module.exports = app; // exporting app into routes
