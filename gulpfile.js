'use strict'

/*
	dependecies
*/
let gulp = require('gulp');
let gulpCoffee = require('gulp-coffee');
let util = require('util');
let path = require('path');

gulp.task('default', ()=>{
	util.log('start compile');

	gulp.src(path.join(__dirname,'coffee-src','modules','*.coffee'))
	.pipe(gulpCoffee())
	.pipe(gulp.dest(path.join(__dirname,'modules')))
});