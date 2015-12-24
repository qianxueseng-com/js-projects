var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    webpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config');

// 编译sass
gulp.task('scss', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

// 图片压缩
gulp.task('minifyImages', function () {
    return gulp.src('./src/img/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

// 压缩css
gulp.task('minifyCss', ['scss'], function () {
    return gulp.src(['./dist/css/main.css'])
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'));
});

// 合并，压缩js文件（针对webpack处理后的js）
gulp.task('minifyScripts', ['webpack'], function () {
    return gulp.src('./dist/js/main.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// 清空图片、样式、js
gulp.task('clean', function () {
    return gulp.src(['./dist/css', './dist/js', './dist/images', './dist/fonts', 'npm-debug.log'], {read: false})
        .pipe(clean({force: true}));
});

// webpack处理js， 与 gulp 配合使用
gulp.task('webpack', function () {
    return gulp.src('./src/js/main.js')
        .pipe(webpack(webpackConfig))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('./dist/js/'));
});

// 默认任务
gulp.task('default', function () {
    runSequence('clean', ['minifyImages', 'minifyScripts', 'minifyCss', 'copyFonts']);
//    // 监听js文件变化
    gulp.watch('./src/js/*', ['minifyScripts']);
    // 监听scss文件变化
    gulp.watch('./src/scss/*.scss', ['minifyCss']);
    // 监测图片变化
    gulp.watch('./src/images/*', ['minifyImages']);
});
