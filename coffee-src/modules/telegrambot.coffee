
'use strict'

telegramBot = require 'node-telegram-bot-api'
# request = require 'request'

token = ''

bot = new telegramBot token, 
	polling: yes

bot.getMe()
	.then (msg)->
		console.log "#{msg.username} is ready!"

# bot.onText /\/echo (.+)/, (msg, match)->
# 	console.log 'got a msg2'
# 	fromId = msg.from.id
# 	resp = match[1]
# 	bot.sendMessage fromId, resp



bot.on 'message',(msg)->
	console.log 'got a msg'
	chatId = msg.chat.id
	bot.sendMessage 'haaaiiimmmm', chatId
		.then (msg)->
			console.log msg

# url = "https://api.telegram.org/#{token}/getMe"

# console.log 'okok'

# request.post url, 'woca', (res)->
# 	console.log res