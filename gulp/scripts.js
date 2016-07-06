var gulp = require('gulp');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('staging/js'));
});
