angular.module('fridgely.favorites', [])
	.controller('FavoritesController', function($scope, Favorites) {
		$scope.data = {};

		var getFavorites = () => {
			Favorites.getFavorites().then((favorites) => {
				$scope.data.favorites = favorites.data;
			});
		};

		$scope.addFavorite = () => {
			if ($scope.data.favorite) {
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