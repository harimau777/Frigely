
angular.module('fridegly.search', [])
  .controller('SearchController', function($scope, Search) {
    $scope.data = {};

    $scope.data.ingredients = [];

    /**
     * @name addIngredients
     * @desc Takes the user input ingredient and adds it to the array of current ingredients
     * @returns undefined
     */
    $scope.addIngredient = function () {
      $scope.data.ingredients.push($scope.ingredient);
      $scope.ingredient = '';
    };

    /**
     * @name deleteIngredient
     * @desc When a user clicks the 'x' on a current ingredient, this will remove the
     *       ingredient fron the list
     * @returns undefined
     */
    $scope.deleteIngredient = function () {
      $scope.data.ingredients.splice($scope.data.ingredients.indexOf(this.ingredient), 1);
    };

    /**
     * @name sendIngredients
     * @desc When a user clicks on the Get Recipes button, this will call the Search service
     *       method, which sends the ingredients to the server
     * @returns undefined
     */
    $scope.sendIngredients = function () {
      Search.sendIngredients($scope.data);
    };

  });


//This may be used in the future to autocomplete ingredient words,  can be drawn from a database full of the ingredient list

// $('input.autocomplete').autocomplete({
//   data: {
//     "Apple": null,
//     "Microsoft": null,
//     "Google": 'http://placehold.it/250x250'
//   }
// });
//
