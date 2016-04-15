#! /usr/local/bin/node

'use strict'


/*
	requirements....
*/
const http = require('http');
const express = require('express');
const path = require('path');
const util = require('util');

const port = 3000;

let app = express();
let server = http.createServer(app);

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.set('port', port)

/*
	demo router
*/
app.use('*', (req, res)=>{
	res.end('welcome!')
});

server.listen(port, ()=>{
	util.log('Server start on port: ', port);
});