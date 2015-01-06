'use strict';

var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha'); // jshint ignore:line

gulp.task('test', function (cb) {
  gulp.src(['lib/**/*.js', 'index.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['test/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});
