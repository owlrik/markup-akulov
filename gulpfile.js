'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const del = require('del');

const htmlbeautify = require('gulp-html-beautify');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');

const babel = require('gulp-babel');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');

const ghpages = require('gh-pages');

const server = require('browser-sync').create();

let isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const cleanBuildDir = () => {
  return del('build');
};

const reload = (done) => {
  server.reload();
  done();
};

const buildPages = () => {
  return gulp.src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@root',
      context: {  // глобальные переменные для include
        test: 'text'
      }
    }))
    .pipe(htmlbeautify({
      'indent_size': 2,
      'preserve_newlines': true,
      'max_preserve_newlines': 0,
      'wrap_attributes': 'auto',
    }))
    .pipe(gulp.dest('build'));
};

const buildStyles = () => {
  return gulp.src('src/sass/style*.scss', {sourcemaps: true})
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(postcss([autoprefixer({
      grid: true,
    })]))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
};

const buildScripts = () => {
  return gulp.src([
    'src/js/libs/**/*.js',
    'src/js/utils/**/*.js',
    'src/js/script.js'
  ], {
    base: 'src',
    sourcemaps: true
  })
  .pipe(plumber())
  .pipe(babel({
    presets: ['@babel/env'],
    ignore: ['node_modules']
  }))
  .pipe(gulp.dest('build'));

  // return gulp.src([
  //   'node_modules/picturefill/dist/picturefill.min.js',
  //   'node_modules/object-fit-images/dist/ofi.min.js',
  //   'node_modules/svg4everybody/dist/svg4everybody.min.js'
  // ])
  // .pipe(gulp.src([
  //   'src/js/lib/**/*.js',
  //   'src/js/utils/**/*.js',
  //   'src/js/script.js'], {sourcemaps: true}))
  // .pipe(plumber())
  // .pipe(babel({
  //   presets: ['@babel/env'],
  //   ignore: ['node_modules']
  // }))
  // .pipe(gulp.dest('build'));
};

const optimizeSvg = () => {
  return gulp.src('src/img/**/*.{svg}')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {removeRasterImages: true},
          {removeUselessStrokeAndFill: false},
        ]
      })
    ]))
    .pipe(gulp.dest('src/img'));
};

const buildSvgSprite = () => {
  return gulp.src('src/img/sprites/svg/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/sprites'));
};

const optimizeImages = () => {
  return gulp.src('build/img/**/*.{jpg,png}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
    ]))
    .pipe(gulp.dest('build/img'));
};

const createWebp = () => {
  return gulp.src('src/img/**/*.{jpg,png}')
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest('src/img'));
};

const copyImages = () => {
  return gulp.src(['src/img/**/*.{jpg,jpeg,png,svg,webp}', '!src/img/sprites/**/*.{jpg,jpeg,png,svg,webp}'], {base: 'src'})
    .pipe(gulp.dest('build'));
};

const copyFonts = () => {
  return gulp.src('src/fonts/**/*.{woff,woff2}')
    .pipe(gulp.dest('build/fonts'));
};

const copyMisc = () => {
  return gulp.src([
    'src/*.*',
    'src/data/**',
    'src/file/**',
    'src/video/**',
  ], {
    base: 'src',
  })
    .pipe(gulp.dest('build'));
};

const syncServer = () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(['src/*.html', 'src/includes/*.html'], gulp.series(buildPages, reload));
  gulp.watch('src/sass/**/*.{scss,sass}', gulp.series(buildStyles));
  gulp.watch('src/js/**/*.js', gulp.series(buildScripts, reload));
  gulp.watch(['src/img/**/*.{jpg,jpeg,png,svg,webp}', '!src/img/sprites/**/*.svg'], gulp.series(optimizeSvg, copyImages, reload));
  gulp.watch('src/img/sprites/svg/*.svg', gulp.series(optimizeSvg, buildSvgSprite, reload));
  gulp.watch('src/fonts/**/*.{woff,woff2}', gulp.series(copyFonts, reload));
  gulp.watch(['src/*.*', '!src/*.html'], gulp.series(copyMisc, reload));
};

const deploy = (cb) => {
  ghpages.publish('build/', cb);
}

const build = gulp.series(
  cleanBuildDir,
  optimizeSvg,
  gulp.parallel(
    copyMisc,
    copyFonts,
    copyImages,
    buildSvgSprite,
    buildStyles,
    buildScripts,
    buildPages
  )
);

const start = gulp.series(build, syncServer);

exports.build = build;
exports.start = start;
exports.webp = createWebp;
exports.imagemin = optimizeImages;
exports.deploy = deploy;
