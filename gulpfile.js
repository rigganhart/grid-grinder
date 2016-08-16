var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var babel = require('gulp-babel')

gulp.task('default',['html','css','js','watch'], function(){

});

gulp.task('html', function() {
    gulp.src(`./index.html`)
        .pipe(gulp.dest('./public'))
});

gulp.task('css',function () {
    gulp.src(`./scss/*.scss`)
      .pipe(sass())
      .pipe(gulp.dest('./public'))
});

gulp.task('js', function () {
    gulp.src('./js/main.js')
        .pipe(browserify())
        .pipe(babel())
        .pipe(gulp.dest('./public'));
});


gulp.task('watch', function(){
  gulp.watch('./scss/styles.scss', ['css'])
  gulp.watch('./index.html', ['html']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./js/*/*.js', ['js']);

})
