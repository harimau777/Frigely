describe('Routing', function() {
  var $route;
  beforeEach(module('fridgely'));

  beforeEach(inject(function($injector) {
  	$route = $injector.get('$route');
  }));
});