var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

  local : {
    username : String,
    password : String,
  },

});

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.hash(password, null, null, function(err, hash) {
    callback(hash);
  });
};

userSchema.methods.validPassword = function(password, callback) {
  bcrypt.compare(password, this.local.password, function(err, res) {
    callback(res);
  });
};

User = mongoose.model('User', userSchema);

module.exports = User;
