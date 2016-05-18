import gulp, { src, dest } from 'gulp';
import postcss from 'gulp-postcss';
import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import tap from 'gulp-tap';
import buffer from 'gulp-buffer';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
import cp from 'child_process';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';

// postcss processors
const processors = [
  autoprefixer({ browsers: ['last 5 versions'] }),
  // cssnano()
];

// jekyll
gulp.task('refresh:jekyll', ['jekyll:build'], () => browserSync.reload());
gulp.task('jekyll:build', (done) => cp.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' }).on('close', done));

gulp.task('refresh:css', ['css'], () => browserSync.reload());
gulp.task('sass', () => src('./_stylesheets/**/*.scss').pipe(sass()).pipe(dest('./css')));
gulp.task('css', ['sass'], () => src(['./css/**/*.css'])
  .pipe(postcss(processors))
  .pipe(dest('./css'))
  .pipe(dest('./_includes'))
  .pipe(dest('./_site/css'))
);

gulp.task('refresh:js', ['js'], () => browserSync.reload());
gulp.task('js', () => src('./_js/**/*.js', { read: false })
  .pipe(tap(file => { file.contents = browserify(file.path, { debug: true, transform: [babelify] }).bundle() }))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(dest('./js'))
  .pipe(dest('./_site/js'))
);

gulp.task('watch', () => {
    gulp.watch('_stylesheets/**/*.scss', ['refresh:css']);
    gulp.watch('_js/**/*.js', ['refresh:js']);
    gulp.watch(['*', '_includes/**/*', '_layouts/**/*', '_posts/**/*', 'blog/**/*', 'events/**/*', 'img/**/*', 'post/**/*'], ['refresh:jekyll']);
});

gulp.task('browser-sync', ['sass', 'jekyll:build'], () => {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('dev', ['browser-sync', 'watch']);
