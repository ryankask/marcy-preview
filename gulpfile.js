var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var nodemon = require('gulp-nodemon');
var nodeEnv = process.env.NODE_ENV || 'development';

gulp.task('styles', function() {
  var sassOptions = {
    style: nodeEnv === 'production' ? 'compressed' : 'nested',
    errLogToConsole: true
  }
  return gulp.src('client/scss/*.scss')
    .pipe(sass(sassOptions))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', function() {
  var bundleOpts = {
    debug: nodeEnv !== 'production'
    //standalone: 'noscope'
  };

  return browserify('./client/js/bootstrap.js')
    .transform('reactify')
    .bundle(bundleOpts)
    .on('error', gutil.log)
    .pipe(source('bootstrap.js'))
    .pipe(gulp.dest('public/js'))
});

gulp.task('server', function() {
  nodemon({
    script: 'index.js',
    ignore: ['public', 'gulpfile.js'],
    env: {
      NODE_ENV: nodeEnv
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('client/scss/**/*.scss', ['styles']);
  gulp.watch('client/js/**/*.js', ['scripts']);
});

gulp.task('build', ['styles', 'scripts']);
gulp.task('default', ['build', 'watch', 'server']);