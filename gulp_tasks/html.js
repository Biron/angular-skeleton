var gulp          = require('gulp'),
    watch         = require('gulp-watch'),
    connect       = require('gulp-connect'),
    rename        = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache'),
    preprocess    = require('gulp-preprocess'),
    minifyHtml    = require('gulp-minify-html'),
    plumber       = require('gulp-plumber'),
    CONFIG        = require('../config');

gulp.task('html', ['index-html'], function () {
    return gulp.src(CONFIG.html.src)
        .pipe(plumber())
        .pipe(rename(function ( path ) {
            path.dirname = path.dirname.replace(/(\\|\/)(modules|templates)/g, '');
            return path;
        }))
        .pipe(minifyHtml({
            empty:  true,
            spare:  true,
            quotes: true
        }))
        .pipe(templateCache({
            standalone: true,
            root:       './templates'
        }))
        .pipe(gulp.dest(CONFIG.html.dest))
        .pipe(connect.reload());
});

gulp.task('index-html', function () {
    return gulp.src('./client/index.html')
        .pipe(plumber())
        .pipe(preprocess({
            context: {
                isCompressed: false
            }
        }))
        .pipe(gulp.dest(CONFIG.build));
});

gulp.task('watch-html', function () {
    watch([CONFIG.html.src, './client/index.html'], function () {
        gulp.start('html')
    });
});

 gulp.task('html:mini', function () {
 return gulp.src(CONFIG.html.src, {
 base: CONFIG.work
 })
 .pipe(preprocess({
 context: {
 isCompressed: true
 }
 }))
 .pipe(minifyHtml({
 empty:  true,
 spare:  true,
 quotes: true
 }))
 .pipe(gulp.dest(CONFIG.html.dest));
 })