'use strict';

describe('RecipeController', function () {
  var $scope, $rootScope, createController, Search, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('fridgely'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Search = $injector.get('Search');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('RecipeController', {
        $scope: $scope,
        Search: Search
      });
    };

  }));

  it('should have a data property on the $scope', function () {
    createController();
    expect($scope.data).to.be.an('object');
  });

  it('should call `Search.getRecipes()` when controller is loaded', function () {
    sinon.spy(Search, 'getRecipes');
    $httpBackend.expectGET('/api/recipes').respond(200);

    createController();
    $httpBackend.flush();

    expect(Search.getRecipes.called).to.equal(true);
    Search.getRecipes.restore();
  });

  it('should populate the data property after the call to `Search.getRecipes()`', function () {
    var mockLinks = [{}, {}, {}];
    $httpBackend.expectGET('/api/recipes').respond(mockLinks);

    createController();
    $httpBackend.flush();

    expect($scope.data.recipes).to.deep.equal(mockLinks);
  });
});
