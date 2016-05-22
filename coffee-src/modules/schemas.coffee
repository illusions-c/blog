'use strict'

mongoose = require 'mongoose'

###
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
###


# Users
users_schema = new mongoose.Schema
	uid: String
	email: String
	sign_date: 
		type: Date
		Default: Date.now
	password: String


module.exports = 
	users_schema: users_schema