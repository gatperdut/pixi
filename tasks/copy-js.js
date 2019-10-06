var gulp  = require('gulp');

gulp.task('copy-js', function () {
  return gulp.src(
    [
      'node_modules/pixi.js-legacy/dist/pixi-legacy.js',
      'node_modules/pixi-keyboard/build/pixi-keyboard.js',
      'node_modules/pixi-timer/build/pixi-timer.js',
      'node_modules/easystarjs/bin/easystar-0.4.3.js',
      'node_modules/underscore/underscore.js',
      'src/js/**/*.js'
    ]
  )
  .pipe(gulp.dest('dist/js'));
});
