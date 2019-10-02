var gulp = require('gulp');

gulp.task('watch-css', function() {
  gulp.watch(
    [
      'src/css/**/*.css',
    ],
    [
      'copy-css'
    ]);
});
