var User = require('../users/user.js');
var jwt = require('jwt-simple');

exports.getFavorites = function(req, res){
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	User.findOne({ 'local.username': user }, (err, entry) => {
		err ? res.send(400) : res.send(entry);
	});
};

exports.addFavorite = function(req, res){
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	User.findOne({ 'local.username': user }, (err, entry) => {
		entry.local.favorites = entry.local.favorites.concat(req.body.favorite);
		entry.save(err => res.send(200));
	});
};

exports.deleteFavorite = function(req, res){
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	var favorite = req.body.favorite;
	User.findOne({ 'local.username': user }, (err, entry) => {
		entry.local.favorites.splice(entry.local.favorites.indexOf(favorite), 1);
		entry.save();
		res.send(200);
	});	
};

exports.getRecipes = function(req, res) {
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	User.findOne({ 'local.username': user }, (err, entry) => {
		err ? res.send(400) : res.send(entry);
	})
};

exports.addRecipe = function(req, res) {
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	User.findOne({ 'local.username': user }, (err, entry) => {
		entry.local.recipes = entry.local.recipes.concat(JSON.stringify(req.body.recipe));
		entry.save(err => res.send(200));
	});
};

exports.removeRecipe = function(req, res) {
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	var recipeName = req.body.recipe.title;
	User.findOne({ 'local.username': user }, (err, entry) => {
		// delete entry.local.recipes[recipeName];
		entry.local.recipes.splice(req.body.index, 1);
		entry.save();
		res.send(200);
	});	

};