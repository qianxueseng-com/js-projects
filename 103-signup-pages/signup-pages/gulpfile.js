// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    minifycss = require('gulp-minify-css');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
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
    gulp.src('./src/images/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
})

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// 部分模块js文件
gulp.task('buildlib', function(){
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('./dist/js'));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], {read: false})
        .pipe(clean());
});

// 默认任务
gulp.task('default', function(){
  gulp.run('lint', 'sass', 'scripts', 'images', 'buildlib');

  // 监听文件变化
  gulp.watch('./src/js/*.js', function(){
    gulp.run('lint', 'scripts');
  });

  gulp.watch('./src/scss/*.scss', function(){
    gulp.run('sass');
  });

  gulp.watch('./src/images/*.png', function(){
    gulp.run('images');
  });
});
