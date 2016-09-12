// spec for router tests
'use strict';

describe('Routing', function () {
  var $route;
  beforeEach(module('fridgely'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));

  // signup test
  it('Should have /signup route, template, and controller', function () {
    expect($route.routes['/signup']).to.be.defined;
    expect($route.routes['/signup'].controller).to.equal('AuthController');
    expect($route.routes['/signup'].templateUrl).to.equal('js/auth/signup.html');
  });

  // login test
  it('Should have /signin route, template, and controller', function () {
    expect($route.routes['/login']).to.be.defined;
    expect($route.routes['/login'].controller).to.equal('AuthController');
    expect($route.routes['/login'].templateUrl).to.equal('js/auth/login.html');
  });

  // landing page test
  it('Should have /landing route, template, and controller', function () {
    expect($route.routes['/landing']).to.be.defined;
    expect($route.routes['/landing'].controller).to.equal('LandingPageController');
    expect($route.routes['/landing'].templateUrl).to.equal('js/landing/landing.html');
  });

  // recipes page test
  it('Should have /recipes route, template, and controller', function () {
    expect($route.routes['/recipes']).to.be.defined;
    expect($route.routes['/recipes'].controller).to.equal('RecipeController');
    expect($route.routes['/recipes'].templateUrl).to.equal('js/recipes/recipes.html');
  });

  // search page test
  it('Should have /search route, template, and controller', function () {
    expect($route.routes['/search']).to.be.defined;
    expect($route.routes['/search'].controller).to.equal('SearchController');
    expect($route.routes['/search'].templateUrl).to.equal('js/search/search.html');
  });

  // signout page test
	it('Should have /signout route, template, and controller', function () {
    expect($route.routes['/signout']).to.be.defined;
    expect($route.routes['/signout'].controller).to.equal('AuthController');
    expect($route.routes['/signout'].templateUrl).to.equal('js/auth/signout.html');
  });  

  
  });
});
