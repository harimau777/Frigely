angular.module('fridgely.services', [])
  .factory('Search', function($http) {

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
        return res.data;
      });
    };

    
    return {
      sendIngredients: sendIngredients
    };
  });
