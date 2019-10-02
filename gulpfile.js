var gulp        = require('gulp');
var runsequence = require('run-sequence');
var requiredir  = require('require-dir');

requiredir('./tasks', { recurse: true });

gulp.task('build', function() {
  runsequence(
    'clean',
    [
      'copy-index',
      'copy-js',
      'copy-css',
      'copy-assets'
    ],
    'inject-js',
    'inject-css'
  );
});

gulp.task('default', function() {
  runsequence(
    'play',
    'watch-index',
    'watch-js',
    'watch-css'
  );
});