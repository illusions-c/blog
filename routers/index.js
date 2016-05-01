(function() {
  'use strict';
  var db, express, router, util;

  express = require('express');

  util = require('util');

  db = require('../modules/db');

  router = express.Router();

  router.get('/', function(req, res) {
    return res.render('index');
  });

  router.get('/sign-in', function(req, res) {
    return res.render('sign-in');
  });

  router.post('/sign_in', function(req, res) {
    return db.signIn(req.body.name, req.body.password).then(function() {
      req.session.uid = req.body.name;
      util.log('somebody sign in!');
      return res.redirect('/');
    }, function(err) {
      util.log('sign in fail: ', err);
      return res.redirect('/sign-in');
    });
  });

  router.get('/sign-up', function(req, res) {
    return res.render('sign-up');
  });

  router.post('/sign_up', function(req, res) {
    return db.signUp(req.body.uid, req.body.email, req.body.password).then(function() {
      util.log('somebody sign up!');
      req.session.uid = req.body.uid;
      return res.redirect('/');
    }, function(err) {
      util.log('sign up fail: ', err);
      return res.redirect('/sign-up');
    });
  });

  module.exports = router;

}).call(this);
