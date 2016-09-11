angular.module('fridgely.services', [])
  .factory('Search', function($http, $location) {
    var recipes = [];

    /**
     * @name sendIngredients
     * @desc Given a list of ingredients, send those ingredients to our server, and get a list
     *   of recipes as a response.
     * @param {???} ingredients - A list of ingredients to post to the server.
     * @returns {Promise.???} Return a promise containing a list of ingredientes.
     */
    var sendIngredients = function(ingredients) {
      return $http({
        method: 'GET',
        url: '/api/recipes',
        params: ingredients
      }).then(function(res) {
        console.log('The result back from the server is;', res);
      });
    };

    /**
     * @name getRecipes
     * @desc Gives the stored recipes for whoever is asking for it
     * @returns list of recipes
     */
    var getRecipes = function() {
      return recipes;
    };

    return {
      sendIngredients: sendIngredients,
      getRecipes: getRecipes,
      recipes: recipes
    };
  })
  .factory('Auth', function($http, $location, $window)  {
    /**
     * @name login
     * @desc Issues a post request to the server to attempt a login with user input info
     * @returns A browser token if sucessful login. If not, returns undefined
     */
    var login = function(user) {
      return $http({
        method: 'POST',
        url: '/api/users/login',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
      });
    };

    /**
     * @name signup
     * @desc Issues a post request to the server to attempt a signup with user input info
     * @returns A browser token if sucessful login. If not, returns undefined
     */
    var signup = function (user) {
      return $http ({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
      .then( function (resp) {
        return resp.data.token;
      });
    };

    /**
     * @name isAuth
     * @desc Checks if there is a token attached to the browser
     * @returns Boolean
     */
      var isAuth = function() {
        return !!$window.localStorage.getItem('com.fridgely');
      };

      /**
       * @name signout
       * @desc Removes the token attached to the browser
       * @returns undefined
       */
      var signout = function() {
        $window.localStorage.removeItem('com.fridgely');
        $location.path('/login');
      };

      return {
        login: login,
        signup: signup,
        isAuth: isAuth,
        signout: signout
      };

  });

