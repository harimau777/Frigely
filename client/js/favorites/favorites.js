angular.module('fridgely.favorites', [])
	.controller('FavoritesController', function($scope, Favorites) {
		$scope.data = {};

		var getFavorites = () => {
			Favorites.getFavorites().then((favorites) => {
				$scope.data.favorites = favorites;
			});
		};

		$scope.addFavorite = () => {
			if ($scope.favorite) {
				Favorites.addFavorite($scope.favorite).then(() => {
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