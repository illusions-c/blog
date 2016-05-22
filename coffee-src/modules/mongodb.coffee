'use strict'

env = process.argv[2]

util = require 'util'
config = require '../config/'+env
mongoose = require 'mongoose'
promise = require 'bluebird'
encrypt = require './encrypt'
schemas = require './schemas'

mongoose.connect config.db_url

db = mongoose.connection

Users = null

db.once 'open',->
	util.log 'mongodb is ready!'
	Users = mongoose.model 'users', schemas.users_schema


# sign in
signUp = (uid, email, password)->
	jiamipassword = encrypt.add password

	new promise (signUpResolve, signUpReject)->
		# 注册
		sign = ->
			user = new Users
				uid: uid
				email: email
				password: jiamipassword
				sign_date: new Date().getTime()

			user.save (err, msg)->
				if err
					util.log 'err: ', err
					signUpReject.call this, '500'
				util.log 'sign up success: ', msg
				signUpResolve.call this

		# 检查是否有已存在的用户名
		check = ->
			new promise (resolve, reject)->
				user = Users.find
					uid: uid
				, (err, msg)->
					if err
						util.log 'err: ', err
						signUpReject.call this, '500'
					if msg.length > 0
						# 用户名已经使用过
						signUpReject.call this, '404'
					else
						# 用户名未使用过，可以注册					
						resolve.call this

		check()
		.then sign



# sign up
signIn = (name, password)->
	new promise (resolve, reject)->
		user = Users.find
			uid: name
		, (err, msg)->
			if err
				util.log 'err: ', err
				reject.call this, '500'
			if msg.length > 1
				throw new Error 'ERR 001'
			if msg.length == 1
				resolve.call this
			else
				reject.call this, '404'


module.exports = 
	signUp: signUp
	signIn: signIn