var unirest = require('unirest');
var config = require('../env/config.js');
var request = require('request');

module.exports = {

  /**
   * @name getRecipeId
   * @desc Executes a get-request with unirest to spoonacular for a LIST of recipeIds
   * @param {Request} - 
   * @param {Response} - 
   * @returns undefined
   */
  getRecipeId: (req, res) => {
    console.log(req.params);
    if (req.params) {
      var recipeId = req.params.recipeId;
      request.get({
        headers: {
          'X-Mashape-Key': config.api_key
        },
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + 
          recipeId + '/information'
      }, 
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
  getRecipesForIngredients: (req, res) => {
    console.log('getRepicesForIngredients req.params: ', req.query);    // DEBUG
    if (req.query) {
      var ingredientsStr = req.query.ingredients.join('%2c+');
      console.log(ingredientsStr); // DEBUG
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
  },

  /**
    * @name getRecipeSteps
    * @desc Executes a get-request to spoonacular for a list of recipe steps
    * @param {recipeId}  the recipe id
    * @returns list of steps for a given recipe
    */
  getRecipeSteps: (req, res) => {
    if (req.body.recipeId) {
      var recipeId = req.body.recipeId;
      request.get({
        headers: {
          'X-Mashape-Key': config.api_key
        },
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + 
          recipeId + '/analyzedInstructions' }, 
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
    * @name getRecipeSummary
    * @desc Executes a get-request to spoonacular for a recipe summary
    * @param {recipeId}  the recipe id
    * @returns summary for a given recipe
    */
  getRecipeSummary: (req, res) => {
    if (req.body.recipeId) {
      var recipeId = req.body.recipeId;
      request.get({
        headers: {
          'X-Mashape-Key': config.api_key
        },
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' +
          recipeId + '/summary' }, 
      function(error, response, body) { 
        if (!error && response.statusCode === 200) { 
          res.send(body); 
        } 
      }); 
    } else {
      res.status(400).send('Invalid Recipe Id');
    }
  }

};

