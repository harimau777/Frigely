/**
 * @name fridgely.recipes
 * @desc The angular controller for rendering recipes.
 */
angular.module('fridgely.recipes', [])
  .controller('RecipeController', function($scope, Search) {
    $scope.data = {};

    $scope.data.recipes = [];

    /**
     * @name getIngredients
     * @desc Get the ingredients for the current recipe from the Search service and store that
     *    in our data.
     * @returns {undefined}
     */
    $scope.getIngredients = function() {
      $scope.data.recipes = Search.getRecipes();
      console.log($scope.data.recipes);
    };

    $scope.getIngredients();

    //This toggles the display of the div that provides link to the search page
    $scope.showSearch = $scope.data.recipes.length === 0;
  });