var ingredientsController = require('../ingredients/ingredientsController.js');
var helpers = require('./helpers.js');
var passport = require('passport');
// maybe recipes controller too

module.exports = function(app) {

  /**
    * @name /api/recipes
    * @desc routes to /api/recipes, and calls .getRecipesForIngredients handler
    * @param {req, res} the request and response for calls
    * @returns {nothing}
    */
  app.post('/api/recipes', ingredientsController.getRecipesForIngredients);

 	app.post('/api/recipe' , ingredientsController.getRecipeId);

 	app.post('/api/recipe/steps', ingredientsController.getRecipeSteps);

 	app.post('/api/recipe/summary', ingredientsController.getRecipeSummary);

  // app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/api/users/signup',
    failureFlash : true
  }));
  // app.get('/api/users/signedin', userController.checkAuth);
};

