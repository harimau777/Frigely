// This file sets up the routes for fridgely

angular.module('fridgely', [
  'fridgely.auth',
  'fridgely.services',
  'fridgely.recipes',
  'fridgely.landing',
  'fridegly.search',
  'ngRoute']
  )

  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'js/auth/login.html',
        controller: 'AuthController'

      })
      .when('/signup', {
        templateUrl: 'js/auth/signup.html',
        controller: 'AuthController'
      })
      .when('/landing', {
        templateUrl: 'js/landing/landing.html',
        controller: 'LandingPageController'
      })
      .when('/recipes', {
        templateUrl: 'js/recipes/recipes.html',
        controller: 'RecipeController'
      })
      .when('/search', {
        templateUrl: 'js/search/search.html',
        controller: 'SearchController'
      })
      .otherwise({
        redirectTo: '/landing'
      });
  });
