var gulp  = require('gulp');

gulp.task('copy-js', function () {
  return gulp.src(
    [
      'node_modules/pixi.js-legacy/dist/pixi-legacy.js',
      'src/js/**/*.js'
    ]
  )
  .pipe(gulp.dest('dist/js'));
});
