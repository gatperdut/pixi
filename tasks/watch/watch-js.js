var gulp = require('gulp');

gulp.task('watch-js', function() {
  gulp.watch(
    [
      'src/js/**/*.js',
    ],
    [
      'copy-js',
      'js-hint'
    ]);
});
