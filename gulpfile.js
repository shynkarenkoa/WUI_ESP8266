"use strict"

const gulp = require("gulp")
    , jade = require("gulp-jade")
    , less = require("gulp-less")
    , postcss = require("gulp-postcss")
    , debug = require("gulp-debug")
    , connect = require('gulp-connect')


gulp.task("jade", () =>

    gulp.src("./jade/*.jade")
        .pipe(jade())
        .pipe(gulp.dest("./app/"))
        .pipe(debug())
)

gulp.task("less", () =>

    gulp.src("./less/*.less")
        .pipe(less())
        .pipe(gulp.dest("./less/css/"))
        .pipe(debug())
)

gulp.task("postcss", () =>
{
    let processors = [ "cssnext", "autoprefixer" ]
        .map(name => require(name)())

    return gulp.src("./less/css/*.css")
        .pipe(postcss(processors))
        .pipe(gulp.dest("./app/css/"))
    // .pipe( postcss([ require('autoprefixer') ]) )

        .pipe(debug())
})

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task("watch", () =>
{
    gulp.watch("./jade/*.jade", [ "jade" ])
    gulp.watch("./less/*.less", [ "less" ])
    gulp.watch("./less/css/*.css", [ "postcss" ])
    gulp.watch(['./app/*.html'], ['html'])
})

gulp.task("default", ["connect", "watch" ])