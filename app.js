#! /usr/local/bin/node

'use strict'


/*
	requirements....
*/
let http = require('http');
let express = require('express');
let path = require('path');
let util = require('util');
let bodyParser = require('body-parser');

let port = 4000;

let app = express();
let server = http.createServer(app);
let routers = require(path.join(__dirname, 'routers'))
let authorize = require(path.join(__dirname, 'modules', 'authorize'))
// let bot = require(path.join(__dirname, 'modules', 'telegrambot'))

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.set('port', port);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(authorize.sessionStore())
app.use(authorize.checkSession)



/*
	router
*/
app.use('/', routers);
app.use((req, res)=>
	res.redirect('/')
);


server.listen(port, ()=>{
	util.log('Server start on port: ', port);
});


process.on('uncaughtException', (err)=>{
	util.log(err)
});