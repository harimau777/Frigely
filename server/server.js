var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');

var morgan = require('morgan');
var request = require('request');
var config = require('./env/config');

var app = express();

// middleware
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


app.use(morgan('dev'));
app.use('/', express.static('client'));

// api/ingredients endpoint
app.get('/api/ingredients', function (req, res) {
  // What are items here? This variable isn't defined... 
  res.send(items);
});

/*
Calls spoonacular api to get recipes.

req.body has a property with an array of ingredients:

{
  "ingredients": [ "hotdogs", "flour", "milk" ]
}

*/
app.post('/api/recipes', function (req, res) {
  var ingredientsStr = req.body.ingredients.join('%2c+');
  request.get({ 
    headers: {
      'X-Mashape-Key': config.api_key
    },
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' +
      'findByIngredients?fillIngredients=false&ingredients=' +
      ingredientsStr +
      '&limitLicense=false&number=5&ranking=1' }, 
    function(error, response, body) { 
      if (!error && response.statusCode === 200) { 
        res.send(body); 
      } 
    }
  ); 
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});

// added in an exports.module line here
module.exports = app; // exporting app into routes
