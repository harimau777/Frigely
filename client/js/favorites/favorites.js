angular.module('fridgely.favorites', [])
	.controller('FavoritesController', function($scope, Favorites, Shared) {
		$scope.data = {};
		$scope.shared = Shared;
		$scope.shared.favorites = [];
		// $scope.shared.favorites = $scope.data.favorites;

		var getFavorites = () => {
			Favorites.getFavorites().then((res) => {
				$scope.data.favorites = res.data.local.favorites;
				//$scope.shared.favorites = $scope.data.favorites;
			});
		};

		$scope.addFavorite = () => {
			// used to demo shared object between components.
			$scope.shared.input = $scope.data.favorite;
			
			if ($scope.data.favorite && $scope.data.favorites.indexOf($scope.data.favorite) === -1) {
				Favorites.addFavorite($scope.data.favorite).then(() => {
					getFavorites();
				});
			}
		};

		$scope.removeFavorite = (favorite) => {
			Favorites.removeFavorite(favorite).then(() => {
				getFavorites();
			});
		};

		$scope.selectFavorite = (favorite) => {
			console.log('Clicked');
			if ($scope.shared.favorites.indexOf(favorite) === -1) {
				$scope.shared.favorites.push(favorite);
			}
			$scope.shared.initIngredients();
			console.log($scope.shared.favorites);
		};

		getFavorites();
	})
	.component('favoritesComponent', {
		templateUrl: 'js/favorites/favorites.html',
		controller: 'FavoritesController',
	});