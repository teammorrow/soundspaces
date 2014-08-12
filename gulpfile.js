var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var path = require('path');
var nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
  return gulp.src(['app/server.js', 'app/web/js/**.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('css', function () {
  return gulp.src('app/web/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/web/css/'));
});

gulp.task('develop', function () {
  nodemon({ script: 'app/server.js', ext: 'ejs js' })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    })
})
