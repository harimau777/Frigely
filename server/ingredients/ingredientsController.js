var unirest = require('unirest');
// var request = require('request');
// may use request later...

module.exports = {
	getRecipeId : (req, res) => {
		console.log('got recipe id');
		// var items = req.body.ingredients;

		// may need some processing

		//These code snippets use an open-source library. http://unirest.io/nodejs
		unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1")
		.header("X-Mashape-Key", "MpWhczL7XsmshSZggYDi3bpSPYyVp1xM1eOjsnRPDTQpwJBtxB")
		.header("Accept", "application/json")
		.end(function (result) {
		  console.log(result.status, result.headers, result.body);
		});

		// not that for each splace, there is a '%2C'

	}
}
