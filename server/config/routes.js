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
  app.post('/api/recipes', ingredientsController.getRecipesForIngredients);

  app.get('/api/recipe/:recipeId', ingredientsController.getRecipeId);

 	app.post('/api/recipe/steps', ingredientsController.getRecipeSteps);

 	app.post('/api/recipe/summary', ingredientsController.getRecipeSummary);


  app.post('/api/users/login', passport.authenticate('local-login', {
    successRedirect : '/#/landing',
    failureRedirect: '/#/login',
    failureflash: true
  }));

  app.post('/api/users/signup', passport.authenticate('local-signup',
    {failureRedirect: '/#/signup'}),
    function(req, res) {
      helpers.tokenize(req, res);
    });
  // app.get('/api/users/signedin', userController.checkAuth);
};

