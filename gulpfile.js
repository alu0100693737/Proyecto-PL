var gulp = require('gulp'),
gutil = require('gulp-util'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat');
var del = require('del');
var karma = require('gulp-karma');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');

gulp.task('minify', function () {
  gulp.src('./public/js/csv.js')
  .pipe(uglify())
  .pipe(gulp.dest('minified'));

  gulp.src('./public/css/*.css')
  .pipe(minifyCSS({keepBreaks:true}))
  .pipe(gulp.dest('./minified/'))
  });

gulp.task('clean', function(cb) {
  del(['minified/*'], cb);
});

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('deploy', function() {
  return gulp.src('./minified/**/*')
    .pipe(ghPages());
});

gulp.task('default', function() {
  gulp.src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
