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

gulp.task('coffee-modules', ()=>{
	util.log('start compile modules');

	gulp.src(path.join(__dirname,'coffee-src','modules','*.coffee'))
	.pipe(gulpCoffee())
	.pipe(gulp.dest(path.join(__dirname,'modules')));
})

gulp.task('coffee-routers', ()=>{
	util.log('start compile routers');

	gulp.src(path.join(__dirname,'coffee-src','routers','*.coffee'))
	.pipe(gulpCoffee())
	.pipe(gulp.dest(path.join(__dirname,'routers')));
})

gulp.task('watch', ()=>{
	gulp.watch('./coffee-src/modules/*.coffee', ['coffee-modules']);
	gulp.watch('./coffee-src/routers/*.coffee', ['coffee-routers']);
})