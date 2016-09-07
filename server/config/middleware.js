var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function(app, express) {
	console.log('into middleware');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
};
