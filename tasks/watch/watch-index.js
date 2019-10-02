var gulp = require('gulp');

gulp.task('watch-index', function() {
  gulp.watch(
    [
      'index.html',
    ],
    [
      'copy-index'
    ]);
});
