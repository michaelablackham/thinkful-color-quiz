var gulp = require('gulp')
var sass = require('gulp-sass')
// var concat = require('gulp-concat')

// - [x] gulp.task
// - [x] gulp.src
// - [x] gulp.dest
// - [x] gulp.watch

var conf = {
  html: {
    src: './src/html/*.html',
    dest: './build'
  }
}

gulp.task('build', ['build:html', 'build:css', 'build:js']);

gulp.task('build:html', function () {
  gulp.src(conf.html.src)
    .pipe(gulp.dest('./build'))
})

gulp.task('build:css', function () {
  gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'))
})

gulp.task('build:js', function () {
  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./build'))
})

gulp.task('watch', function () {
  gulp.watch([
    conf.html.src,
    './src/scss/*.scss',
    './src/js/*.js',
  ], ['build']);
})
