var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename');

gulp.task('default', function () {
  gulp.start('scripts', 'styles');
});

gulp.task('scripts', function() {
  // return gulp.src('src/js/**/*.js')
  return gulp.src(['src/js/lib/jquery-1.12.3.js', 'src/js/lib/handlebars-v4.0.5', 'src/js/**/*.js'])
    .pipe(concat('main.js'))
    // .pipe(gulp.dest('public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('styles', function() {
  return gulp.src('src/css/**/*.css')
    .pipe(concat('main.css'))
    // .pipe(gulp.dest('public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(cssnano())
    .pipe(gulp.dest('public/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {

  // Watch .css files
  gulp.watch('src/css/**/*.css', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);

});