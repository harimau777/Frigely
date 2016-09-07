var config = require('../env/config');
var request = require('request');

module.exports = function(app) {
  /*
  Calls spoonacular api to get recipes.

  req.body has a property with an array of ingredients:

  {
    'ingredients': [ 'hotdogs', 'flour', 'milk' ]
  }

  */

  app.post('/api/recipes', function (req, res) {
    var ingredientsStr = req.body.ingredients.join('%2c+');
    request.get({
      headers: {
        'X-Mashape-Key': config.api_key
      },
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + ingredientsStr + '&limitLicense=false&number=5&ranking=1' }, 
      function(error, response, body) { 
        if (!error && response.statusCode === 200) { 
          res.send(body); 
        } 
      }
    ); 
  });

};
