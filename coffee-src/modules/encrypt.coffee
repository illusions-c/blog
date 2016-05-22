'use strict'

crypto = require 'crypto'

# 检查输入
check = (input, remain)->
	md5 = crypto.createHash 'md5'

	md5.update input
	output = md5.digest('hex')

	console.log output, remain
	if output is remain
		return yes
	else
		return no

# crypt
add = (sth)->
	md5 = crypto.createHash 'md5'

	md5.update sth

	return md5.digest('hex')

module.exports = 
	check: check
	add: add

