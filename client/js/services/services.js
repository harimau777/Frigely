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
        // Maybe what we want to do here is then go through each returned recipe, 
        //   and perform some more server side requests to get more recipe information.
        //   If we do something like that, we might consider caching recipe searches in our db
        //   or some other optimization. 
        $location.path('/recipes');
        recipes = Promise.all(res.data.map(function(recipe) {
          return $http({
            method: 'GET',
            url: `/api/recipe/${recipe.id}`
          }).then(function(recipeInfo) {
            return recipeInfo.data;
          });
        }));
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
