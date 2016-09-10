var jwt = require('jwt-simple');

//helper functions for various things

module.exports = {
  /**
   * @name isLoggedIn
   * @desc check to see if user is authenticated
   */
  isLoggedIn : function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/landing');
  },

  /**
   * @name decode
   * @desc Takes the user ajax request and ensures the user has a token
   */
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

  /**
   * @name tokenize
   * @desc Creates the token for the user's username
   */
  tokenize: function (req, res) {
    var token = jwt.encode(req.user.local.username, 'secret');
    res.json({token: token});
  }
};
