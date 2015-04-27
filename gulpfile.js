'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

function createLintTask(taskName, files) {
  gulp.task(taskName, function() {
    return gulp.src(files)
      .pipe(plugins.plumber())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.notify(jshintNotify))
      .pipe(plugins.jshint.reporter('fail'));
  });
}

// Send a notification when JSHint fails,
// so that you know your changes didn't build
function jshintNotify(file) {
  if (!file.jshint) { return; }
  return file.jshint.success ? false : 'JSHint failed';
}

// Lint our source code
createLintTask('lint-src', ['src/**/*.js']);

// Lint our test code
createLintTask('lint-test', ['test/**/*.js']);

gulp.task('build', function () {
  return gulp.src('src/**/*.js')
    .pipe(plugins.babel())
    .pipe(gulp.dest('dist/'));
});

// Lint and run our tests
gulp.task('test', ['lint-src', 'lint-test'], function() {
  require('babel/register')({ modules: 'common' });
  return gulp.src(['test/**/*.js'])
    .pipe(plugins.mocha({ reporter: 'dot' }));
});

gulp.task('watch', function() {
  var watchFiles = ['src/**/*', 'test/**/*', 'package.json', '**/.jshintrc'];
  gulp.watch(watchFiles, ['test']);
});

gulp.task('default', ['test']);
