var gulp = require('gulp');

gulp.task('svg', function () {
  return gulp.src('src/img/**/*.svg')
    // .pipe(svgmin())
    .pipe(gulp.dest('staging/img'));
});
