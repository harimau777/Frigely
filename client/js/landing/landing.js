angular.module('fridgely.landing', [])
  .controller('LandingPageController', function($scope, Shared) {
    // Title
    $scope.shared = Shared;
    $scope.LPtext = {};
    // $scope.LPheader = 'ACT FRIDGE-FRIENDLY. BE FOOD-SAVY. COMBAT SELF-HUNGER.';
    $scope.LPtext.title = 'Join the Fight Against Self-Hunger';
    $scope.LPtext.descriptions = ['Be Like Mike.', 'Act fridge-friendly.', 'Use fridgely.'];
  })
  .component('landingComponent', {
		templateUrl: 'js/landing/landing.html',
		controller: 'LandingPageController',
	});