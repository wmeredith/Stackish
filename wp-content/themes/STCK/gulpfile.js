/* File: gulpfile.js */

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    jshint     = require('gulp-jshint'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify');

// Default task
gulp.task('default', ['build-css', 'build-js']);

// JShint task
gulp.task('jshint', function() {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// JS compilation task
gulp.task('build-js', ['jshint'], function() {
    return gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        // Only uglify if gulp is ran with '--type production' flag
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

// CSS compilation task
gulp.task('build-css', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(sass())
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(gulp.dest('build/css'));
});

// Configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('js/**/*.js', ['build-js']);
    gulp.watch('scss/**/*.scss', ['build-css']);
});
