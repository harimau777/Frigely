var unirest = require('unirest');
// var request = require('request');
// may use request later...

module.exports = {

	getRecipe : (req, res) => {
		// var recipeId = req.body.recipeId;
		// we will need to switch out the number part of the below string with recipeId 
		// to make it dynamic

		console.log('etnered into the getREcipe for controller');
		unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/324694/analyzedInstructions?stepBreakdown=true")
			.header("X-Mashape-Key", "MpWhczL7XsmshSZggYDi3bpSPYyVp1xM1eOjsnRPDTQpwJBtxB")
			.header("Accept", "application/json")
			.end(function (result) {
  		console.log(result.status, result.headers, result.body);
		}); //not sure how we are going to send it back....
	},



}