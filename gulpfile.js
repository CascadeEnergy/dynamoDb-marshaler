'use strict';

var gulp = require('gulp');
var gulpIstanbul = require('gulp-istanbul');
var gulpMocha = require('gulp-mocha');

gulp.task('test', function(cb) {
  gulp.src(['lib/**/*.js', 'index.js'])
    .pipe(gulpIstanbul())
    .pipe(gulpIstanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['test/**/*.js'])
        .pipe(gulpMocha())
        .pipe(gulpIstanbul.writeReports())
        .on('end', cb);
    });
});
