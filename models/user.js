//jshint node:true
'use strict';

var moment = require('moment');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var userSchema = mongoose.Schema({
  basic: {
    email: String,
    password: String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(secret, admin) {
  var expires = moment().add(10, 'm').valueOf();
  var self = this;
  var token = jwt.encode({
    iss: self._id,
    exp: expires,
    adm: admin
  }, secret);
  return token;
};

module.exports = mongoose.model('User', userSchema);
