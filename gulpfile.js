'use strict'

/*
	dependecies
*/
let gulp = require('gulp');
let gulpCoffee = require('gulp-coffee');
let gulpSass = require('gulp-sass');
let util = require('util');
let path = require('path');

/*
	default task
*/
gulp.task('default', [
	'coffee-modules',
	'coffee-routers',
	]);

/*
	coffee modules
*/
gulp.task('coffee-modules', ()=>{
	util.log('start to compile modules');

	gulp.src(path.join(__dirname,'coffee-src','modules','*.coffee'))
	.pipe(gulpCoffee())
	.pipe(gulp.dest(path.join(__dirname,'modules')));
})

/*
	coffee routers
*/
gulp.task('coffee-routers', ()=>{
	util.log('start to compile routers');

	gulp.src(path.join(__dirname,'coffee-src','routers','*.coffee'))
	.pipe(gulpCoffee())
	.pipe(gulp.dest(path.join(__dirname,'routers')));
})

/*
	scss -> css
*/
gulp.task('css', ()=>{
	util.log('start to compile scss');

	gulp.src(path.join(__dirname,'sass-src','*.scss'))
	.pipe(gulpSass())
	.pipe(gulp.dest(path.join(__dirname,'public','stylesheets')));
})


gulp.task('watch', ()=>{
	gulp.watch('./coffee-src/modules/*.coffee', ['coffee-modules']);
	gulp.watch('./coffee-src/routers/*.coffee', ['coffee-routers']);
	gulp.watch('./sass-src/*.scss', ['css']);
})