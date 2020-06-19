////////////////////////////////////////////////////////////////////////////////
//
//  gulpfile.js: Basic SCSS, HTML and JS build
//
////////////////////////////////////////////////////////////////////////////////

const { src, task, watch, dest, series, parallel } = require("gulp");

var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var gutil = require("gulp-util");
var imagemin = require("gulp-imagemin");
var pipeline = require("readable-stream").pipeline;
var del = require("del");

function clean(cb) {
  return del(["docs/*"]);
}

function css(cb) {
  return src("source/scss/*.*")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .on("error", gutil.log)
    .pipe(autoprefixer())
    .on("error", gutil.log)
    .pipe(dest("docs/css"))
    .on("error", gutil.log)
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function html(cb) {
  return src("source/*.html")
    .pipe(dest("docs"))
    .on("error", gutil.log)
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function scripts(cb) {
  return pipeline(
    src("source/js/*.js"),
    uglify(),
    dest("docs/js"),
    browserSync.reload({
      stream: true,
    })
  );
}

function browser_sync(cb) {
  browserSync.init({
    server: {
      baseDir: "docs",
    },
    browser: "google chrome",
  });
  cb();
}

function reload(cb) {
  return browserSync.reload({
    stream: true,
  });
}

function watch_files(cb) {
  watch("./source/scss/**/*.scss", css);
  watch("./source/*.html", html);
  watch("./source/js/**/*.js", scripts);
  cb();
}

exports.clean = clean;
exports.css = css;
exports.html = html;
exports.scripts = scripts;
exports.default = series(
  clean,
  parallel(css, html, scripts),
  browser_sync,
  watch_files
);
exports.build = series(clean, parallel(css, html, scripts));
