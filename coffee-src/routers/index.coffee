'use strict'

express = require 'express'
util = require 'util'
db = require '../modules/db'
authorize = require '../modules/authorize'

router = express.Router()

# 主页
router.get '/', (req, res)->
	res.render 'index'

# 登录
router.get '/sign-in', (req, res)->
	res.render 'sign-in'
router.post '/sign_in', (req, res)->
	db.signIn req.body.name, req.body.password
	.then ->
		req.session.uid = req.body.name
		util.log 'somebody sign in!'
		res.redirect '/'
	, (err)->
		util.log 'sign in fail: ', err
		res.redirect '/sign-in'

# 注册
router.get '/sign-up', (req, res)->
	res.render 'sign-up'
router.post '/sign_up', (req, res)->
	db.signUp req.body.uid, req.body.email, req.body.password
	.then ->
		util.log 'somebody sign up!'
		req.session.uid = req.body.uid
		res.redirect '/'
	, (err)->
		util.log 'sign up fail: ', err
		res.redirect '/sign-up'

# 登出
router.get '/sign-out', authorize.destroySession

module.exports = router