var unirest = require('unirest');
var config = require('../env/config.js');
var request = require('request');

module.exports = {

	/**
	  * @name getRecipeId
	  * @desc Executes a get-request with unirest to spoonacular for a LIST of recipeIds
	  * @param {???} array of ingredients
	  * @returns list of recipeIds that match the passed in ingredients
		*/
	getRecipeId : (req, res) => {
			if (req.body.recipeId) {
			var recipeId = req.body.recipeId;
      request.get({
        headers: {
          'X-Mashape-Key': config.api_key
        },
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+ recipeId + '/information' }, 
        function(error, response, body) { 
          if (!error && response.statusCode === 200) { 
            res.send(body); 
          } 
      }); 
    	} else {
      	res.status(400).send('Invalid Recipe Id');
    	}
	},

	/**
    * @name getRecipesForIngredients
    * @desc Sends a get-request to spoonacular findByIngredients API call
    * @param {req, res} the request and response for calls
    * @returns {obj} General Recipe info per string of ingredients
    */

	getRecipesForIngredients : (req, res) => {
		if (req.body.ingredients) {
      var ingredientsStr = req.body.ingredients.join('%2c+');
      request.get({
        headers: {
          'X-Mashape-Key': config.api_key
        },
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/' +
          'recipes/findByIngredients?fillIngredients=false&ingredients=' +
          ingredientsStr +
          '&limitLicense=false&number=5&ranking=1' }, 
        function(error, response, body) { 
          if (!error && response.statusCode === 200) { 
            res.send(body); 
          } 
      }); 
    	} else {
      	res.status(400).send('No ingredients found');
    	}
	}


}
