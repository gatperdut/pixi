var gulp  = require('gulp');

gulp.task('copy-js', function () {
  return gulp.src(
    [
      'node_modules/pixi.js-legacy/dist/pixi-legacy.js',
      'node_modules/pixi-keyboard/build/pixi-keyboard.js',
      'src/js/**/*.js'
    ]
  )
  .pipe(gulp.dest('dist/js'));
});
