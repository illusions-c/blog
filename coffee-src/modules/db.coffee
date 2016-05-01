'use strict'

mysql = require 'mysql'
util = require 'util'
promise = require 'bluebird'
encrypt = require './encrypt'

config = 
	host: 'localhost'
	user: 'root'
	password: ''
	database: 'blog'
	useTransaction:
		connectionLimit: 1

conn = mysql.createConnection config

conn.connect(->
	util.log 'db is ready!'
	)

# sign in
signUp = (uid, email, password)->

	jiamipassword = encrypt.add password
	pInsertData = 'insert into users(uid, email, password) values("'+uid+'", "'+email+'", "'+jiamipassword+'")'
	
	new promise (resolve, reject)->	
		conn.query pInsertData, (err, rows, fields)->
			if err
				util.log 'err: ', err
				reject.call this

			util.log 'sign up success: ', rows
			resolve.call this
			
# sign up
signIn = (name, password)->

	pFindUser = 'select * from users where uid = "' +name+ '" or email = "'+name+ '"'

	new promise (resolve, reject)->
		conn.query pFindUser, (err, rows, fields)->
			if err
				util.log 'err: ', err
				reject.call this, err
			util.log 'okok', rows
			if rows.length is 1
				util.log 'input: ', password, 'remain: ', rows[0].password
				passwordRight = encrypt.check password, rows[0].password

				util.log 'sign in success: ', rows
				resolve.call this
			else
				reject.call this, '404'

module.exports = 
	signUp: signUp
	signIn: signIn