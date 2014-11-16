//jshint node:true

'use strict';
var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.jwt || req.body.jwt;

    var decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch(err) {
      console.log(err);
      return res.status(403).send('access denied');
    }

    User.findOne({_id: decoded.iss}, function (err, user) {
      if (err) return res.status(403).send('access denied');
      if (!user) return res.status(403).send('access denied');
      if (Date.now() > decoded.exp) return res.status(403).send('login again');
      req.user = user;
      req.decodedJwt = decoded;
      next();
    });
  };
};
