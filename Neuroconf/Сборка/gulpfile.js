const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');



function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.min.js', 
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js', 
    'node_modules/gsap/dist/gsap.min.js', 
    'node_modules/gsap/dist/ScrollTrigger.min.js',
    'node_modules/swiper/swiper-bundle.js',
    'app/js/main.js',
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

// function styles() {
//   return src ('app/scss/style.scss')
//   .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
//   .pipe(concat('style.min.css'))
//   .pipe(scss({ outputStyle: 'compressed'}))
//   .pipe(dest('app/css'))
//   .pipe(browserSync.stream())
// }
function styles() {
  return src('app/scss/style.scss')
    .pipe(scss()) // Компилируем SCSS
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] })) // Добавляем префиксы
    .pipe(cleanCSS({ level: { 1: { specialComments: 'none' } }, format: 'keep-breaks' })) // Минификация с сохранением читаемости
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}
function watching() {
  watch(['app/scss/style.scss'], styles)
  watch(['app/js/main.js'], scripts)
  watch(['app/*.html']).on('change', browserSync.reload)
}

function browsersync(){
  browserSync.init({
    server: {
        baseDir: "app/"
    }
});
}
function images(){
  return src('app/images/**/*')
  .pipe(imagemin(
    [
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]
  ))
  .pipe(dest('dist/images'))
}
function videos() {
  return src('app/video/**/*') // Путь к видеофайлам
    .pipe(dest('dist/video')); // Куда копировать видеофайлы
}

function cleanDist() {
  return src('dist')
  .pipe(clean())
}

function building(){
  return src ([
    'app/css/style.min.css',
    'app/js/main.min.js',
    'app/fonts/**/*',
    'app/**/*.html',
    'app/video/**/*'
  ],{base : 'app'})
  .pipe(dest('dist'))
}


exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, building);

exports.default = parallel(styles, scripts, browsersync, watching);