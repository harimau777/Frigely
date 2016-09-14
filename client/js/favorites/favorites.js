angular.module('fridgely.favorites', [])
	.controller('FavoritesController', function($scope, Favorites, Shared) {
		$scope.data = {};
		$scope.shared = Shared;

		var getFavorites = () => {
			Favorites.getFavorites().then((res) => {
				$scope.data.favorites = res.data.local.favorites;
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

		getFavorites();
	})
	.component('favoritesComponent', {
		templateUrl: 'js/favorites/favorites.html',
		controller: 'FavoritesController',
	});