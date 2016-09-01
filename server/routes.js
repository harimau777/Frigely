// routes
var recipe = require('./recipes/recipeController.js').getRecipe;
var ingredients = require('./ingredients/ingredientsController.js').getRecipeId;

module.exports = function(app, express) {
	// api/ingredients endpoint

	// get recipeId per ingredients
	app.post('/api/ingredients', function (req, res) {
		console.log('routed into the get /api/ingredients');	  // res.send(items);
		ingredients(req, res);
	});

	// this endpoint is used to get the recipe given a recipe id
	app.get('/api/recipe', (req, res) => {
		console.log('routed into the /api/recipe');
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

// need a post to get recipe id
// need a post enter l

// get recipe information
