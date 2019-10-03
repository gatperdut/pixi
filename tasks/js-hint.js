var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var cache  = require('gulp-cached');

gulp.task('js-hint', function () {
  return gulp.src(['src/js/**/*.js'])
    .pipe(cache('js-hint'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
