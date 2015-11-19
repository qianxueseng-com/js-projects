/* eslint-disable */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    eslint = require('gulp-eslint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    webpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config'),
    util = require('gulp-util'),
    mocha = require('gulp-mocha');

// 检查js
gulp.task('eslint', function () {
    return gulp.src('./src/js/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

// 复制src中的字体文件到dist目录
gulp.task('copyFonts', function () {
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
});

// 编译sass
gulp.task('scss', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

// 图片压缩
gulp.task('minifyImages', function () {
    return gulp.src('./src/images/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
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

// 压缩html
gulp.task('minifyHtml', function () {
    return gulp.src('*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/html'));
});

// 清空图片、样式、js
gulp.task('clean', function () {
    return gulp.src(['./dist/css', './dist/js', '!./dist/js/jquery.min.js', './dist/images', './dist/html', './dist/fonts', 'npm-debug.log'], {read: false})
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
    runSequence('clean', ['eslint', 'minifyImages', 'minifyScripts', 'minifyCss', 'copyFonts']);
    // 监听js文件变化
    gulp.watch('./src/js/*', ['minifyScripts']);
    gulp.watch('./test/*.js', ['convertTestJs']);
    // 监听scss文件变化
    gulp.watch('./src/scss/*.scss', ['minifyCss']);
    // 监测图片变化
    gulp.watch('./src/images/*', ['minifyImages']);
    // 监测字体变化
    gulp.watch('./src/fonts/*', ['copyFonts']);
});

// 转换待测试模块js
gulp.task('convertTestJs', function () {
    return gulp.src('test/tests-in-browser.js')
        .pipe(webpack())
        .pipe(rename('tests.convert.js'))
        .pipe(gulp.dest('test/dist/'));
});
