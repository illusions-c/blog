(function() {
  'use strict';
  var add, check, crypto;

  crypto = require('crypto');

  check = function(input, remain) {
    var md5, output;
    md5 = crypto.createHash('md5');
    md5.update(input);
    output = md5.digest('hex');
    console.log(output, remain);
    if (output === remain) {
      return true;
    } else {
      return false;
    }
  };

  add = function(sth) {
    var md5;
    md5 = crypto.createHash('md5');
    md5.update(sth);
    return md5.digest('hex');
  };

  module.exports = {
    check: check,
    add: add
  };

}).call(this);
