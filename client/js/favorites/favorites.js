angular.module('fridgely.favorites', [])
	.controller('FavoritesController', function($scope, Favorites) {
		$scope.data = {};

		var getFavorites = () => {
			Favorites.getFavorites().then((res) => {
				$scope.data.favorites = res.data.local.favorites;
			});
		};

		$scope.addFavorite = () => {
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