var jwt = require('jwt-simple');

//helper functions for various things

module.exports = {
  isLoggedIn : function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/landing');
  },

  decode: function (req, res, next) {
    var token = req.headers['x-access-token'];
    var user;

    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  },

  tokenize: function (req, res) {
    var token = jwt.encode(req.user.local.username, 'secret');
    res.json({token: token});
  }
};
