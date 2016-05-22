'use strict'

redis = require 'redis'
session = require 'express-session'
util = require 'util'
urlFilter = require './url-filter'
RedisStore = (require 'connect-redis') session

redisClient = redis.createClient 6379, 'localhost'

redisClient.on 'ready', ()->
	util.log 'redis is ready!'

redisOptions = 
	client: redisClient
	host: 'localhost'
	port: 6379
	ttl: 60 * 60 * 24 * 7  # 一星期
	
sessionStore = ()->
	session 
		store: new RedisStore(redisOptions)
		secret: 'feja wfjewi'
		resave: no
		saveUninitialized: yes
		

checkSession = (req, res, next)->
	if req.url.match urlFilter
		return next() 
	return res.redirect '/sign-in' if not req.session.uid?
	next()

destroySession = (req, res, next)->
	if req.session.uid
		util.log req.session.uid, 'sign out'
		delete req.session.uid
	
	res.redirect '/sign-in'


module.exports = 
	sessionStore: sessionStore
	checkSession: checkSession
	destroySession: destroySession



