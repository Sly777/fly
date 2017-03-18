var gulp = require('gulp');

var paths = {
  source: {
    cssFolder: 'static_sources/css',
    cssMain: 'static_sources/css/fly.css'
  },
  build: {
    css: 'static/css'
  },
};

gulp.task('css', function () {
    var postcss = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src(paths.source.cssMain)
      .pipe(sourcemaps.init())
      .pipe(postcss([
        require("stylelint")(),
        require('lost'),
        require("postcss-import")(),
        require("postcss-url")(),
        require("postcss-cssnext")(),
        require("cssnano")({ autoprefixer: false }), // to minify
        require("postcss-reporter")({ clearMessages: true }),
      ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.build.css));
});

gulp.task('watch:css', function () {
  gulp.watch(paths.source.cssFolder + '/**/*.css', ['css']);
});

gulp.task('default', ['css']);
