// routes
var recipe = require('./recipes/recipeController.js').getRecipe;
var ingredients = require('./ingredients/ingredientsController.js').getRecipeId;

module.exports = function(app, express) {
	/**
     * @name post('/api/ingredients')
     * @desc Given a list of ingredients on req.body, will pass to ingredientsController for handling
     * @param {???} ingredients - request and response
     * @returns n/a
     */
	app.post('/api/ingredients', function (req, res) {
		console.log('routed into the get /api/ingredients');	  // res.send(items);
		ingredients(req, res);
	});

	/**
     * @name post('/api/recipes')
     * @desc Given a recipeId on req.body, will pass to recipeController for handling
     * @param {???} ingredients - request and response
     * @returns n/a
     */
	app.get('/api/recipes', (req, res) => {
		console.log('routed into the /api/recipes');
		recipe(req, res);

	});

	//*****below endpoints aren't in use yet.******
	app.post('/add/:item', function (req, res) {
		console.log('routed into the post /add/:item');
	  // console.log('req', JSON.stringify(req.body));
	  // addItem(req.params.item);
	  // res.send(JSON.stringify(req.body));
	});


};
