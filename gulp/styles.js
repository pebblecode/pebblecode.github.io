var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');

var processors = [
  require('autoprefixer'),
  require('precss'),
  require('postcss-for'),
  require('postcss-conditionals'),
  require('postcss-nesting'),
  require('postcss-color-function')
];

gulp.task('styles', function(  ) {
  gulp.src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(cssnano())
    .pipe(gulp.dest('staging/css'));
});
