var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    port = process.env.port || 3031;


gulp.task('browserify', function() {
    gulp.src('./app/src/js/main.js')
        .pipe(browserify({
            transform: 'reactify'
        }))
        .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('open', function() {
    var options = {
        uri: 'http://localhost:' + port
    };
    gulp.src('./app/index.html')
        .pipe(open(options));
});

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: port,
        livereload: true
    });
});

gulp.task('js', function() {
    gulp.src('./app/dist/js/*.js')
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});
gulp.task('css', function() {
    gulp.src('./app/src/css/*.css')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('app/dist/js/*.js', ['js']);
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/src/css/*.css', ['css']);
    gulp.watch('app/src/js/**/*.js', ['browserify']);

});

gulp.task('default', ['browserify']);
gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);
