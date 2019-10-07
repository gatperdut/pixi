var gulp   = require('gulp');
var inject = require('gulp-inject');
var order  = require('gulp-order');
var rename = require('gulp-rename');

gulp.task('inject-js', function () {
  var src = gulp.src(
    [
      'dist/js/**/*.js'
    ],
    {
      base: process.cwd()
    }
  )
  .pipe(order([
    'dist/js/pixi-legacy.js',
    'dist/js/map/Map.js',
    '**/*.js'
  ]))
  .pipe(rename(function (path) {
    path.dirname = './js/' + path.dirname.split('/').slice(2).join('/');
  }));

  return gulp.src('dist/index.html')
  .pipe(inject(src, { addRootSlash: false }))
  .pipe(gulp.dest('dist'));
});
