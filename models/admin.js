//jshint node:true
'use strict';

//adminschema not yet in use.

var moment = require('moment');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var adminSchema = mongoose.Schema({
  basic: {
    email: String,
    password: String,
    adcode: 'Admincode'
  }
});

adminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

adminSchema.methods.generateToken = function(secret, admin) {
  var expires = moment().add(10, 'm').valueOf();
  var self = this;
  var token = jwt.encode({
    iss: self._id,
    exp: expires,
    adm: true
  }, secret);
  return token;
};

module.exports = mongoose.model('Admin', adminSchema);
