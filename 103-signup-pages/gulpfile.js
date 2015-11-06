var gulp = require('gulp');
var del = require('del');

gulp.task('clean:tempFlie', function (cb) {
    del([
        'out/*.hot-update.*',
        'out/*.eot',
        'out/*.ttf',
        'out/*.svg',
        'out/*.woff',
        'npm-debug.log'
    ], cb);
});

gulp.task('default', ['clean:tempFlie']);