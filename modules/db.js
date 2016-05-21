(function() {
  'use strict';
  var config, conn, encrypt, mysql, promise, signIn, signUp, util;

  mysql = require('mysql');

  util = require('util');

  promise = require('bluebird');

  encrypt = require('./encrypt');

  config = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'blog',
    useTransaction: {
      connectionLimit: 1
    }
  };

  conn = mysql.createConnection(config);

  conn.connect(function() {
    return util.log('db is ready!');
  });

  signUp = function(uid, email, password) {
    var jiamipassword, pInsertData;
    jiamipassword = encrypt.add(password);
    pInsertData = "insert into users(uid, email, password) values('" + uid + "', '" + email + "', '" + jiamipassword + "')";
    return new promise(function(resolve, reject) {
      return conn.query(pInsertData, function(err, rows, fields) {
        if (err) {
          util.log('err: ', err);
          reject.call(this, '500');
        }
        util.log('sign up success: ', rows);
        return resolve.call(this);
      });
    });
  };

  signIn = function(name, password) {
    var pFindUser;
    pFindUser = "select * from users where uid = '" + name + "' or email = '" + name + "'";
    return new promise(function(resolve, reject) {
      return conn.query(pFindUser, function(err, rows, fields) {
        var passwordRight;
        if (err) {
          util.log('err: ', err);
          reject.call(this, '500');
        }
        if (rows.length === 1) {
          passwordRight = encrypt.check(password, rows[0].password);
          util.log('sign in success: ', rows);
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
