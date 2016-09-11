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
  app.use('/api/recipes', helpers.decode);
  app.get('/api/recipes', ingredientsController.getRecipesForIngredients);

  app.get('/api/recipe/:recipeId', ingredientsController.getRecipeId);

 	app.post('/api/recipe/steps', ingredientsController.getRecipeSteps);

 	app.post('/api/recipe/summary', ingredientsController.getRecipeSummary);


  app.post('/api/users/login', passport.authenticate('local-login', {
    failureRedirect: '/#/login',
  }), function(req, res) {
    helpers.tokenize(req, res);
  });

  app.post('/api/users/signup', passport.authenticate('local-signup',
    {failureRedirect: '/#/signup'}),
    function(req, res) {
      helpers.tokenize(req, res);
    });
  // app.get('/api/users/signedin', userController.checkAuth);
};

