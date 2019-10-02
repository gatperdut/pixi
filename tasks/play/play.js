var gulp        = require('gulp');
var http        = require('http');
var connect     = require('connect');
var servestatic = require('serve-static');
var url         = require("url");

gulp.task('play', function () {
  var port = 9000;

  var app = connect()
  .use(servestatic(__dirname + './../../dist/'));

  http.createServer(app).listen(
    port,
    function () {

    }
  );
});
