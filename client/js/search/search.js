
angular.module('fridegly.search', [])
  .controller('SearchController', function($scope, Search) {
    $scope.data = {};

    $scope.data.ingredients = [];

    $scope.addIngredient = function () {
      $scope.data.ingredients.push($scope.ingredient);
      $scope.ingredient = '';
    };

    $scope.deleteIngredient = function (e) {
      console.log('deleting', this.ingredient);
      $scope.data.ingredients.splice($scope.data.ingredients.indexOf(this.ingredient), 1);
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
