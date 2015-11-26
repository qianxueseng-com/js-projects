var gulp = require('gulp'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	rename = require('gulp-rename'),
	webpack = require('gulp-webpack');


	gulp.task('webpack', function(){
		return gulp.src('src/entry.js')
		.pipe(webpack())
		.pipe(gulp.dest('dist/'));
	})

	gulp.task('sass', function(){
		return gulp.src('styles/*.scss')
		.pipe(sass())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('dist'))
		.pipe(livereload());
	});

	gulp.task('uglify', function(){
		return gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('dist'))
		.pipe(livereload());
	})


	gulp.task('clean', function(cb){
	    return del([' package/tab/code/dontry/dist'], cb);
	})

	gulp.task('watch:sass', function(){
		livereload.listen();
		gulp.watch('styles/*.scss',['sass']);
	});


	gulp.task('default',function(){
		console.log('rebuild the page');
		gulp.start('clean','sass','uglify','watch:sass');
	})