var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
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
  var browserifyOptions = {
    transform: ['reactify'],
    debug: nodeEnv !== 'production'
  };

  return gulp.src('client/js/app.js')
    .pipe(plumber())
    .pipe(browserify(browserifyOptions))
    .pipe(gulp.dest('public/js'))
    .on('error', gutil.log);
});

gulp.task('server', function() {
  nodemon({
    script: 'index.js',
    ignore: ['public'],
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