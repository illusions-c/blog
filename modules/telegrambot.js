(function() {
  'use strict';
  var bot, telegramBot, token;

  telegramBot = require('node-telegram-bot-api');

  token = '198440149:AAGOddwIsWPX4sXkVnZmDAWhygMXKp5_Xe4';

  bot = new telegramBot(token, {
    polling: true
  });

  bot.getMe().then(function(msg) {
    return console.log(msg.username + " is ready!");
  });

  bot.on('message', function(msg) {
    var chatId;
    console.log('got a msg');
    chatId = msg.chat.id;
    return bot.sendMessage('haaaiiimmmm', chatId).then(function(msg) {
      return console.log(msg);
    });
  });

}).call(this);
