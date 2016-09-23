// 引入 gulp
var gulp = require('gulp');

// 引入组件
var eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    minifycss = require('gulp-minify-css'),
    webpack = require('gulp-webpack'),
    runSequence = require('run-sequence'),
    webpackConfig = require('./webpack.config');

// 检查脚本
gulp.task('eslint', function () {
  return gulp.src('./src/js/*.js')
         .pipe(eslint())
         .pipe(eslint.format());
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'));
});

// 图片处理
gulp.task('images', function(){
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
})

// 利用webpack来处理js, 其他交给gulp来处理
gulp.task('webpack', function () {
  return gulp.src('./src/js/main.js')
         .pipe(webpack(webpackConfig))
         .pipe(gulp.dest('./dist/js/'));
});

// 合并，压缩文件
gulp.task('scripts', ['webpack'], function() {
    gulp.src('./dist/js/main.js')
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});


// 部分模块js文件
gulp.task('buildlib', function(){
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('./dist/js'));

  gulp.src('./node_modules/backbone/backbone-min.js')
      .pipe(gulp.dest('./dist/js'));

  gulp.src('./node_modules/backbone/node_modules/underscore/underscore-min.js')
      .pipe(gulp.dest('./dist/js'));

  gulp.src('./node_modules/chai/chai.js')
      .pipe(gulp.dest('./dist/js'));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], {read: false})
        .pipe(clean());
});

// 默认任务
gulp.task('default', function(){
  runSequence('eslint', 'sass', 'scripts', 'images', 'buildlib');

  // 监听文件变化
  gulp.watch('./src/js/*.js', function(){
    gulp.run('eslint', 'scripts');
  });

  gulp.watch('./src/scss/*.scss', function(){
    gulp.run('sass');
  });

  gulp.watch('./src/images/*', function(){
    gulp.run('images');
  });
});
