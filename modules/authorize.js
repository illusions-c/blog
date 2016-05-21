(function() {
  'use strict';
  var RedisStore, checkSession, destroySession, redis, redisClient, redisOptions, session, sessionStore, urlFilter, util;

  redis = require('redis');

  session = require('express-session');

  util = require('util');

  urlFilter = require('./url-filter');

  RedisStore = (require('connect-redis'))(session);

  redisClient = redis.createClient(6379, 'localhost');

  redisClient.on('ready', function() {
    return util.log('redis is ready!');
  });

  redisOptions = {
    client: redisClient,
    host: 'localhost',
    port: 6379,
    ttl: 60 * 60 * 24 * 7
  };

  sessionStore = function() {
    return session({
      store: new RedisStore(redisOptions),
      secret: 'feja wfjewi',
      resave: false,
      saveUninitialized: true
    });
  };

  checkSession = function(req, res, next) {
    if (req.url.match(urlFilter)) {
      return next();
    }
    if (req.session.uid == null) {
      return res.redirect('/sign-in');
    }
    return next();
  };

  destroySession = function(req, res, next) {
    if (req.session.uid) {
      util.log(req.session.uid, 'sign out');
      delete req.session.uid;
    }
    return res.redirect('/sign-in');
  };

  module.exports = {
    sessionStore: sessionStore,
    checkSession: checkSession,
    destroySession: destroySession
  };

}).call(this);
