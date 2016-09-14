var User = require('../users/user.js');
var jwt = require('jwt-simple');

exports.getFavorites = function(req, res){
	var user = jwt.decode(req.headers['x-access-token'], 'secret');
	User.findOne({ user: user }, (err, entry) => {
		err ? res.send(400) : res.send(entry);
	});
};

exports.addFavorites = function(req, res){
	var user = jwt.decode(req.body.token, 'secret');
	User.findOne({ user: user }).update(
    {favorites: req.body.favorites}, 
    {$setOnInsert: req.body.favorites}, 
    {upsert: true}, 
    function(err, numAffected) {
    	err ? res.send(400) : res.send(200);
    }
	);
};

exports.deleteFavorites = function(req, res){
	var user = jwt.decode(req.body.token, 'secret');
	User.findOne({ user: user })
	.find({ favorites: req.query.favorites })
		.remove().exec();
};