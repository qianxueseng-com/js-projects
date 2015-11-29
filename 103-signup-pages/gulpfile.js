var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    rename = require('gulp-rename'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    inject = require('connect-livereload')(),
    path = require('path'),
    serve = require('gulp-serve'),
    gutil = require('gulp-util'),
    paths = {
        scripts: ['entry.js'],
        // file list for watching
        asserts: ['*.css', 'index.html']
    };

//static server
gulp.task('serve', serve({
        root: [__dirname],
        //inject livereload script to html
        middleware: inject
    }))


gulp.task('webpack', function(cb) {
    webpack(webpackConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
    })
});

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

        //keep the sever alive or continue?
        //callback();
    });
});

gulp.task('webpack-stream', function() {
    return gulp.src('./entry.js')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('dist/'));
});


gulp.task('sass', function() {
    return gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

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


gulp.task('default', function() {
    console.log('rebuild the page');
    gulp.start('clean', 'sass', 'watch:sass', 'webpack-dev-server');
})
