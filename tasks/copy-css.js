var gulp  = require('gulp');

gulp.task('copy-css', function () {
  return gulp.src(
    [
      'src/css/**/*.css'
    ]
  )
  .pipe(gulp.dest('dist/css'));
});
