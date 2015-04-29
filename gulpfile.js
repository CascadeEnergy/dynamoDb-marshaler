'use strict';

var gulp = require('gulp');
var isparta = require('isparta');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

function createLintTask(taskName, files) {
  gulp.task(taskName, function() {
    return gulp.src(files)
      .pipe(plugins.plumber())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
  });
}

function test() {
  return gulp.src(['test/**/*.js'])
    .pipe(plugins.mocha());
}

// Lint our source code
createLintTask('lint-src', ['src/**/*.js']);

// Lint our test code
createLintTask('lint-test', ['test/**/*.js']);

gulp.task('build', function () {
  return gulp.src('src/**/*.js')
    .pipe(plugins.babel())
    .pipe(gulp.dest(''));
});

gulp.task('coverage', ['lint-src', 'lint-test'], function(done) {
  require('babel/register')({ modules: 'common' });
  gulp.src(['src/**/*.js'])
    .pipe(plugins.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe(plugins.istanbul.hookRequire())
    .on('finish', function() {
      return test()
        .pipe(plugins.istanbul.writeReports())
        .on('end', done);
    });
});

// Lint and run our tests
gulp.task('test', ['lint-src', 'lint-test'], function() {
  require('babel/register')({ modules: 'common' });
  return test();
});

gulp.task('watch', function() {
  var watchFiles = ['src/**/*', 'test/**/*', 'package.json', '**/.jshintrc'];
  gulp.watch(watchFiles, ['test']);
});

gulp.task('default', ['test']);
