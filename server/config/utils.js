var User = require('../users/user.js');
var jwt = require('jwt-simple');

exports.getFavorites = function(req, res){
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	User.findOne({ 'local.username': user }, (err, entry) => {
		console.log(entry);
		err ? res.send(400) : res.send(entry);
	});
};

exports.addFavorite = function(req, res){
	console.log(req.body);
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	console.log(user);
	User.findOne({ 'local.username': user }, (err, entry) => {
		entry.local.favorites = entry.local.favorites.concat(req.body.favorite);
		entry.save(err => res.send(200));
	});
};

exports.deleteFavorite = function(req, res){
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	console.log('req', req)
	User.findOne({ user: user })
	.find({ favorites: req.query.favorites })
		.remove().exec();
};