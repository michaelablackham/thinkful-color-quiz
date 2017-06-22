var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')

gulp.task('build', ['build:html', 'build:css', 'build:js']);

gulp.task('build:html', function () {
  gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./build'))
})

gulp.task('build:css', function () {
  gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'))
})

gulp.task('build:js', function () {
  gulp.src('./src/js/*.js')
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./build'))
})

gulp.task('watch', function () {
  gulp.watch([
    './src/html/*.html',
    './src/scss/*.scss',
    './src/js/*.js',
  ], ['build']);
})
