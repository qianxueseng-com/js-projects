var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    rename = require('gulp-rename'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    minifycss = require('gulp-minify-css'),
    gutil = require('gulp-util');


gulp.task('webpack-dev-server', function(cb) {
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;
    myConfig.output.publicPath = 'http://localhost:8080/';
    myConfig.plugins = myConfig.plugins || [];
    myConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    // myConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server');
    var compiler = webpack(myConfig);
    //inline mode
    new WebpackDevServer(compiler, {
        // contentBase: 'http://localhost:8080/',
        // Set this as true if you want to access dev server from arbitrary url.
        // This is handy if you are using a html5 router.
        historyApiFallback: false,
        // Don't forget this for dev-server
        publicPath: '/dist/',
        lazy: false,
        hot: true,
        colors: true
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        //server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/");

    });
});


gulp.task('sass', function() {
    return gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('minifycss', function(){
    return gulp.src('dist/*.scss')
        .pipe(minifycss({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
})

gulp.task('uglify', function() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
})


gulp.task('clean', function(cb) {
    return del([' package/tab/code/dontry/dist'], cb);
})

gulp.task('watch:sass', function() {
    livereload.listen();
    gulp.watch('styles/*.scss', ['sass']);
});


gulp.task('dev-server', function() {
    console.log('rebuild the page');
    gulp.start('clean', 'sass', 'watch:sass', 'minifycss','webpack-dev-server');
})

gulp.task('product', function(){
    console.log('production version');
    gulp.start('clean', 'minifycss', 'uglify');
})
