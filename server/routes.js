// routes
var recipe = require('./recipes/recipeController.js').getRecipe;

module.exports = function(app, express) {
	// api/ingredients endpoint

	app.get('/api/ingredients', function (req, res) {
		console.log('routed into the get /api/ingredients');	  // res.send(items);

	});

	app.post('/add/:item', function (req, res) {
		console.log('routed into the post /add/:item');
	  // console.log('req', JSON.stringify(req.body));
	  // addItem(req.params.item);
	  // res.send(JSON.stringify(req.body));
	});

	// calls api to get recipes
	app.post('/api/recipes', function (req, res) {
		console.log('routed into the post /api/recipes');
	  // prepare req.body for api
	  // res.send('api called with ingredients');
	});

	app.get('/api/recipe', (req, res) => {
		recipe(req, res);
		console.log('got recipes');
	})

};

// need a post to get recipe id
// need a post enter l

// get recipe information
