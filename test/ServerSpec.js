var expect = require('chai').expect;
var request = require('request');


// TODO: We should have a set of config files somewhere that this can use.


// Should be able to connect to the server.
describe('', function() {
  describe('Basic Server Tests', function() {
    it('Should be able to connect to the server', function(done) {
      request
        .get('http://127.0.0.1:8000')
        .on('response', (res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it('Should get a 404 for pages that do not exist', function(done) {
      request
        .get('http://127.0.0.1:8000/asdjaoisjd')
        .on('response', (res) => {
	  expect(res.statusCode).to.equal(404);
          done();
        });
    });

    it('Should not be able to call spoonacular api if ingredients array is empty', function(done) {
      request
        .post('http://127.0.0.1:8000/api/recipes')
        .on('response', (res) => {
          expect(res.statusCode).to.not.equal(500);
          done();
        });
    });
  });
});

// Should be able to search recipies on the server. 



