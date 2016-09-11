var unirest = require('unirest');
var config = require('../env/config.js');
var request = require('request');
var rp = require('request-promise');
var _ = require('underbar');


/**
 * @name getPromise
 * @desc Given two strings, method representing an HTTP method, and uri representing the end of
 *    a spoonacular uri endpoint, return a promise that resolves to an object that is the
 *    response of an REST call to the spoonacular endpoint. 
 * @param {string} method - The HTTP method (GET, POST, etc.) that we would like to execute. 
 * @param {string} uri - The end of a URI that we would like to make a call against. 
 * @returns {Promise<Object>} Return a promise that resolves to a request response. 
 */
var getPromise = function(method, uri) {
  var options = {
    method: method,
    headers: {
      'X-Mashape-Key': config.api_key
    },
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${uri}`
  };

  return rp(options);  
};

/**
 * @name getSteps
 * @desc Given a string representing a recipe id, return an promise that resolves to an object
 *   containing the detailed steps to prepare the recipe. 
 * @param {string} id - A recipe ID that we're interested in.
 * @returns {Promise<Object>} Returns a promise that resolves to an object.
 */
var getSteps = function(id) {
  return getPromise('GET', `${id}/analyzedInstructions`);
};

/**
 * @name getSummary
 * @desc Given a string id representing a recipe id, return a promise that will resolve to an 
 *   object containing the recipe summary. 
 * @param {string} id - A string representing a recipe id. 
 * @returns {Promise<Object>} Returns a promise that will resolve to an object. 
 */
var getSummary = function(id) {
  return getPromise('GET', `${id}/summary`);
};


module.exports = {
  
  /**
   * @name getRecipesForIngredients
   * @desc Sends a get-request to spoonacular findByIngredients API call
   * @param {req, res} the request and response for calls
   * @returns {obj} General Recipe info per string of ingredients
   */
  getRecipesForIngredients: (req, res) => {
    if (req.query.ingredients) {
      var ingredientsStr = req.query.ingredients.join('%2c+');

      getPromise('GET', 'findByIngredients?fillIngredients=false&ingredients=' +
                 `${ingredientsStr}&limitLicense=false&number=5&ranking=1`)
        .then(result => {
          return JSON.parse(result);
        })
        .then(result => {
          var newRes = [];

          result.forEach(recipe => {
            newRes.push(recipe);
            newRes.push(getSummary(recipe.id));
            newRes.push(getSteps(recipe.id));
          });

          Promise.all(newRes).then(values => {
            var sol = [];

            for (var i = 0; i < values.length; i += 3) {
              var tmp = values[i];
              tmp['summary'] = JSON.parse(values[i + 1]).summary;
              tmp['steps'] = JSON.parse(values[i + 2]).steps;
              if (JSON.parse(values[i + 2])[0]) {
                tmp['steps'] = JSON.parse(values[i + 2])[0].steps;
              } else {
                tmp['steps'] = [];
              }
              sol.push(tmp);
            }

            res.send(sol);
          });
        })
        .catch(function(err) {
          console.log(`There was an error: ${err}`);
          res.status(400).send('Problem fetching recipes.');
        });
    } else {
      res.status(400).send('No ingredients found');
    }
  }
};

