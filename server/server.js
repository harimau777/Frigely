var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var config = require('./env/config');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', express.static('client'));

// api/ingredients endpoint
app.get('/api/ingredients', function (req, res) {
  res.send(items);
});

/*
Calls spoonacular api to get recipes.

req.body has a property with an array of ingredients:

{
  "ingredients": [ "hotdogs", "flour", "milk" ]
}
g
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
