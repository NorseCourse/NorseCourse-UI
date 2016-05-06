
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
var debug = require('gulp-debug');

// lint task
gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// compile sass
gulp.task('sass', function() {
    console.log('helllllooooo?5');
    return gulp.src('src/**/*.scss')
        .pipe(concat('style.scss'))
        .pipe(sass({onError: function(e) { console.log(e); } }))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});

// prepare scripts
gulp.task('js', function() {
    console.log('helllllooooo?4');
    gulp.src(['src/**/module.js', 'src/**/*.js'])
        .pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(debug())
        //.pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

// ngdocs task
gulp.task('ngdocs', [], function () {
    console.log('helllllooooo?3');
    var gulpDocs = require('gulp-ngdocs');
    return gulp.src('src/app/*.js')
        .pipe(gulpDocs.process())
        .pipe(gulp.dest('./docs'));
});

// html task
gulp.task('html', function() {
    console.log('helllllooooo2?');
    gulp.src('src/app/index.html')
        .pipe(gulp.dest('dist/'));
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/views'));
});

// build task
gulp.task('build', ['lint', 'html', 'sass', 'js','ngdocs'])

// serve task
gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: "./dist"
    });
    console.log('helllllooooo1?');
    gulp.watch('src/**/*.js', ['lint', 'js']).on('change', browserSync.reload);
    gulp.watch('src/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('src/**/*.html', ['html']).on('change', browserSync.reload);
});
