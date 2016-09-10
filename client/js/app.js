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
        controller: 'LandingPageController',
        authenticate: true
      })
      .when('/recipes', {
        templateUrl: 'js/recipes/recipes.html',
        controller: 'RecipeController',
        authenticate: true
      })
      .when('/search', {
        templateUrl: 'js/search/search.html',
        controller: 'SearchController',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/landing'
      });

      $httpProvider.interceptors.push('AttachTokens');
  })
  .factory('AttachTokens', function ($window) {
    console.log('Attaching Tokens');
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('com.fridgely');
        console.log('jwt: ', jwt);
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
    })
  .run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function( evt, next, current) {
      if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
        $location.path('/login');
      }
    });
  });
