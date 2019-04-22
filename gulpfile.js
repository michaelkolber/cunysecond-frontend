const {watch, src, dest} = require('gulp');

const autoprefixer = require('autoprefixer');
const bs = require('browser-sync');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('sass');

function serve(cb) {
    bs.init({
        server: true
    });

    watch('dev/scss/*.scss', css);
    watch('index.html').on('change', bs.reload);
    watch('assets/js/*.js').on('change', bs.reload);

    cb();
}

function css(cb) {
    var plugins = [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ];

    return src('dev/scss/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(postcss(plugins))
        .pipe(sourcemaps.write())
        .pipe(dest('assets/css'))
        .pipe(bs.stream());
}

exports.default = serve;