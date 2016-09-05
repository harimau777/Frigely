var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));

/**
simulate database
**/
var items = [];

var addItem = function(item) {
  var itemObj = {};
  if (item) {
    itemObj._id = items.length;
    itemObj.name = item;
    items.push(itemObj);
  }
};

// add array of items
var addItems = function(food) {
  food.forEach(function(item) {
    addItem(item);
  });
};

addItems(['carrots', 'potatoes', 'rice']);


// api/ingredients endpoint
app.get('/api/ingredients', function (req, res) {
  res.send(items);
});

app.post('/add/:item', function (req, res) {
  console.log('req', JSON.stringify(req.body));
  addItem(req.params.item);
  res.send(JSON.stringify(req.body));
});

// calls api to get recipes
app.post('/api/recipes', function (req, res) {
  console.log(req.body.ingredients);
  // prepare req.body for api
  // res.send('api called with ingredients:', req.body.ingredients);
  res.send('api called with ingredients:', req.body);
});

app.get('/', function (req, res) {
  res.send('Home Page');
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});
