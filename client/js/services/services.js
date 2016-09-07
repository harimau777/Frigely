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
        method: 'POST',
        url: '/api/recipes',
        data: ingredients
      }).then(function(res) {
        console.log(res);
        recipes = res.data;
        $location.path('/recipes');
        return res.data;
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
  });
