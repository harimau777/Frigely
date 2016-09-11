var unirest = require('unirest');
var config = require('../env/config.js');
var request = require('request');
var rp = require('request-promise');


/**
 * @name extend
 * @desc Given two objects ob1 and ob2, add the key/value pairs of ob2 to ob1. 
 * @param {Object} ob1 - An object that we want to add key/value pairs to.
 * @param {Object} ob2 - An object with key/value pairs of interest. 
 * @returns {Object}
 */
var extend = function(ob1, ob2) {
  for (var key in ob2) {
    if (!(key in ob1)) {
      ob1[key] = ob2[key];
    }
  }

  return ob1;
};

/**
 * @name getPromise
 * @desc Given two strings, method representing an HTTP method, and uri representing the end of a spoonacular uri endpoint, return a promise that resolves to an object that is the response of an REST call to the spoonacular endpoint. 
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
  console.log(`Making a rest call to: ${options.url}`); // DEBUG

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
    console.log('getRepicesForIngredients req.params: ', req.query);    // DEBUG
    if (req.query.ingredients) {
      var ingredientsStr = req.query.ingredients.join('%2c+');
      console.log(ingredientsStr); // DEBUG

      getPromise('GET', 'findByIngredients?fillIngredients=false&ingredients=' +
                 `${ingredientsStr}&limitLicense=false&number=5&ranking=1`)
        .then(function(result) {
          return JSON.parse(result);
        })
        .then(function(result) {
          var sol = [];
          
          // For each recipe that is returned, we need to perform more API calls to get
          //   the recipe summaries, steps, etc. We then extend the current recipe with
          //   those results.
          result.forEach(recipe => {
            var tmp = recipe;
            
            Promise.all([getSummary(recipe.id), getSteps(recipe.id)]).then(values => {
              values.forEach(value => extend(tmp, value));
              console.log('The resulting recipe is:', tmp);
              sol.push(tmp);
            });
          });

          res.send(sol);
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

