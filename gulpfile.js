var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    sass         = require ('gulp-ruby-sass'),
    autoprefixer = require ('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    jekyll       = require('gulp-jekyll'),
    // livereload  = require('gulp-livereload'),
    watch        = require('gulp-watch'),
    jshint       = require('gulp-jshint'),
    deploy       = require('gulp-gh-pages'),
    rename       = require('gulp-rename'),
    minifycss    = require('gulp-minify-css'),
    connect      = require('gulp-connect'),
    jshint       = require('gulp-jshint'),
    cp           = require('child_process'),
    spawn        = require('child_process').spawn,
    plumber      = require('gulp-plumber'),
    debug        = require('gulp-debug');

var paths = {
  scripts: ['js/*.js'],
  sass:    ['_sass/**/*.scss'],
  jekyll:  ['_layouts/*.html', '_posts/*', '_site']
};

// Run Jekyll Build Asynchronously
gulp.task('jekyll', function () {
    var jekyll = spawn('bundle', ['exec jekyll build']);

    jekyll.on('exit', function (code) {
        console.log('-- Finished Jekyll Build --')
    });

    gulp.src(paths.jekyll)
      .pipe(connect.reload());
});

// Server
gulp.task('connect', function() {
  connect.server({
    root: __dirname,
    port: 4000,
    livereload: true
  });
});

// CSS
gulp.task('style', function() {
  return gulp.src({glob: '_sass/**/*.scss'})
    .pipe(plumber())
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});

gulp.task('style-dev', function() {
  return gulp.src('_sass/**/*.scss')
  return sass('_sass/**/*.scss', {
      style: 'compressed'
  })
  .pipe(autoprefixer())
  .pipe(gulp.dest('css'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('js'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  // gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['styles-dev']);
  // gulp.watch(['*.html', '*/*.html', '*/*.md', '!_site/**', '!_site/*/**'], ['jekyll']);

  // When a file in _site directory changes, reload the page
  gulp.watch(['_site/*/**']).on('change', function (file) {
    connect.reload();
  });
});

gulp.task('default', ['style-dev', 'connect', 'jekyll',  'watch']);
