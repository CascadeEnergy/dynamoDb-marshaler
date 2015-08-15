'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var isparta = require('isparta');
var source = require('vinyl-source-stream');

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
  return gulp.src(['es6/test/**/*.js'])
    .pipe(plugins.mocha());
}

// Lint our source code
createLintTask('lint-es6', ['es6/**/*.js']);

// Lint our test code
createLintTask('lint-test', ['es6/test/**/*.js']);

gulp.task('build-node', ['lint-es6'], function() {
  return gulp.src('es6/**/*.js')
    .pipe(plugins.babel({optional: 'runtime'}))
    .pipe(gulp.dest(''));
});

gulp.task('build-browser', ['lint-es6'], function() {
  var b = browserify('./es6/dynamodb-marshaler.js', {standalone: 'dynamodb-marshaler'});
  var bstream;

  b.transform(babelify.configure({optional: ['runtime']}));
  bstream = b.bundle();
  return bstream
    .on('error', function(err){
      console.log(err.message);
      this.emit('end');
    })
    .pipe(plugins.plumber())
    .pipe(source('dynamodb-marshaler.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(plugins.rename('./dist/dynamodb-marshaler.min.js'))
    .pipe(plugins.streamify(plugins.uglify))
    .pipe(gulp.dest(''));
});

gulp.task('build', ['build-node', 'build-browser']);

gulp.task('coverage', ['lint-es6', 'lint-test'], function(done) {
  require('babel/register')({ modules: 'common' });
  gulp.src(['es6/**/*.js', '!es6/test/**'])
    .pipe(plugins.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe(plugins.istanbul.hookRequire())
    .on('finish', function() {
      return test()
        .pipe(plugins.istanbul.writeReports())
        .on('end', done);
    });
});

// Lint and run our tests
gulp.task('test', ['lint-es6', 'lint-test'], function() {
  require('babel/register')({ modules: 'common' });
  return test();
});

gulp.task('watch', function() {
  var watchFiles = ['es6/**/*', 'es6/test/**/*', 'package.json', '**/.jshintrc'];
  gulp.watch(watchFiles, ['test']);
});

gulp.task('default', ['test']);
