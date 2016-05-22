(function() {
  'use strict';
  var mongoose, users_schema;

  mongoose = require('mongoose');


  /*
  String
  Number
  Date
  Buffer
  Boolean
  Mixed
  ObjectId
  Array
   */

  users_schema = new mongoose.Schema({
    uid: String,
    email: String,
    sign_date: {
      type: Date,
      Default: Date.now
    },
    password: String
  });

  module.exports = {
    users_schema: users_schema
  };

}).call(this);
