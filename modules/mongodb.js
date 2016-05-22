(function() {
  'use strict';
  var Users, config, db, encrypt, env, mongoose, promise, schemas, signIn, signUp, util;

  env = process.argv[2];

  util = require('util');

  config = require('../config/' + env);

  mongoose = require('mongoose');

  promise = require('bluebird');

  encrypt = require('./encrypt');

  schemas = require('./schemas');

  mongoose.connect(config.db_url);

  db = mongoose.connection;

  Users = null;

  db.once('open', function() {
    util.log('mongodb is ready!');
    return Users = mongoose.model('users', schemas.users_schema);
  });

  signUp = function(uid, email, password) {
    var jiamipassword;
    jiamipassword = encrypt.add(password);
    return new promise(function(signUpResolve, signUpReject) {
      var check, sign;
      sign = function() {
        var user;
        user = new Users({
          uid: uid,
          email: email,
          password: jiamipassword,
          sign_date: new Date().getTime()
        });
        return user.save(function(err, msg) {
          if (err) {
            util.log('err: ', err);
            signUpReject.call(this, '500');
          }
          util.log('sign up success: ', msg);
          return signUpResolve.call(this);
        });
      };
      check = function() {
        return new promise(function(resolve, reject) {
          var user;
          return user = Users.find({
            uid: uid
          }, function(err, msg) {
            if (err) {
              util.log('err: ', err);
              signUpReject.call(this, '500');
            }
            if (msg.length > 0) {
              return signUpReject.call(this, '404');
            } else {
              return resolve.call(this);
            }
          });
        });
      };
      return check().then(sign);
    });
  };

  signIn = function(name, password) {
    return new promise(function(resolve, reject) {
      var user;
      return user = Users.find({
        uid: name
      }, function(err, msg) {
        if (err) {
          util.log('err: ', err);
          reject.call(this, '500');
        }
        if (msg.length > 1) {
          throw new Error('ERR 001');
        }
        if (msg.length === 1) {
          return resolve.call(this);
        } else {
          return reject.call(this, '404');
        }
      });
    });
  };

  module.exports = {
    signUp: signUp,
    signIn: signIn
  };

}).call(this);
