// Automatically load Gulp plugins
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    changed = require('gulp-changed'),
    jscs = require('gulp-jscs'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    lazypipe = require('lazypipe'),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    pngquant = require('imagemin-pngquant');

// Define filepaths
var paths = {
  styles: {
    src: 'src/scss/styles.scss',
    destDir: 'static/css/',
    destFile: 'styles.css',
    watch: 'src/scss/**/*.scss'
  },
  scripts: {
    src: 'src/js/*.js',
    destDir: 'static/js/'
  },
  images: {
    src: 'src/img/**/*',
    destDir: 'static/img/',
    watch: [ 'src/img/**/*', '!src/img/**/*@2x.{jpg,png}' ]
  }
};

// Styles Build
gulp.task('styles', ['clean:styles'], function() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.styles.destDir));
});

// Script Builds
gulp.task('scripts', ['clean:scripts'], function(  ) {
  gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.destDir));
});

// Image Builds
gulp.task('images', ['clean:images'], function(  ) {
  gulp.src(paths.images.src)
    .pipe(changed(paths.images.destDir))
    .pipe(imagemin({
      progressive: true,
      use: [ pngquant() ]
    }))
    .pipe(gulp.dest(paths.images.destDir));
});

// Empty Directories
var del = require('del');
gulp.task('clean:styles', function(  ) {
  del([
    'static/css/*.*',
    'static/maps/**.css.map'
  ]);
});

gulp.task('clean:images', function(  ) {
  del([
    'static/images/**.*'
  ]);
});

gulp.task('clean:scripts', function(  ) {
  del([
    'static/js/**.*',
    'static/maps/**.js.map'
  ]);
});

// LiveReload
gulp.task('watch', function(  ) {
  livereload.listen();
  gulp.watch(paths.styles.watch, ['styles']);
  gulp.watch(paths.scripts.src, ['scripts']);
  gulp.watch(paths.images.watch, ['images']);
});

// The Default Task
gulp.task('default', ['watch']);
