var ingredientsController = require('../ingredients/ingredientsController.js');
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


};
