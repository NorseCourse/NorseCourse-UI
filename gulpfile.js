var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var ngAnnotate = require('gulp-ng-annotate')
var sourcemaps = require('gulp-sourcemaps')
var minifyCss = require('gulp-minify-css');

// lint task
gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// compile sass
gulp.task('sass', function() {
    return gulp.src('src/**/*.scss')
        .pipe(concat('style.scss'))
        .pipe(sass({onError: function(e) { console.log(e); } }))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});

// prepare scripts
gulp.task('js', function() {
    gulp.src(['src/**/module.js', 'src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

// html task
gulp.task('html', function() {
    gulp.src('src/app/index.html')
        .pipe(gulp.dest('dist/'));
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/views'));
});

// serve task
gulp.task('serve', ['lint', 'html', 'sass', 'js'], function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('src/**/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch('src/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('src/**/*.html', ['html']).on('change', browserSync.reload);
});
