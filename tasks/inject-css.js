var gulp   = require('gulp');
var inject = require('gulp-inject');
var rename = require('gulp-rename');

gulp.task('inject-css', function () {
  var src = gulp.src(
    [
      'dist/css/**/*.css'
    ],
    {
      base: process.cwd()
    }
  )
  .pipe(rename(function (path) {
    path.dirname = './css/' + path.dirname.split('/').slice(2).join('/');
  }));

  return gulp.src('dist/index.html')
  .pipe(inject(src, { addRootSlash: false }))
  .pipe(gulp.dest('dist'));
});
