angular.module('fridgely.landing', [])
  .controller('LandingPageController', function($scope) {
    // Title
    $scope.LPtext = {};
    // $scope.LPheader = 'ACT FRIDGE-FRIENDLY. BE FOOD-SAVY. COMBAT SELF-HUNGER.';
    $scope.LPtext.title = 'Join the Fight Against Self-Hunger';
    $scope.LPtext.descriptions = ['Be food-savy.', 'Act fridge-friendly.', 'Use fridgely.'];
  }
);