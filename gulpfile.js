const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass')); //преобразование scss/sass в css
const concat = require('gulp-concat'); // объединение файлов
const uglify = require('gulp-uglify-es').default; //используется для минификации js
const browserSync = require('browser-sync').create(); // запускает локальный сервер
const autoprefixer = require('gulp-autoprefixer'); // приводит css к кроcсбраузерности
const clean = require('gulp-clean'); // удаление папок

const merge = require('merge-stream'); // одновременно запускать три "ветки" обработки
const svgmin = require('gulp-svgmin'); // оптимизация .svg

const avif = require('gulp-avif'); // конвертер в avif
const webp = require('gulp-webp'); // конвертер в webp
const imagemin = require('gulp-imagemin'); // сжимание картинок
const newer = require('gulp-newer'); // кэш
const svgSprite = require('gulp-svg-sprite'); // объединение svg картинок в 1 файл
const include = require('gulp-include'); // подключение html к html
const typograf = require('gulp-typograf'); //расставляет неразрывные пробелы в нужных местах

function resources() {
    return src('app/upload/**/*')
        .pipe(dest('dist/upload'))
}

function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(typograf({
            locale: ['ru', 'en-US'],
            safeTags: [
                ['<no-typography>', '</no-typography>']
            ]
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

    /*
        Если есть необходимость в модульности (Создание картинок по папкам с секциями)
    */
function images() {
    const srcPattern = [
        'app/images/src/**/*.*',    // все файлы во вложенных папках
        '!app/images/src/**/*.svg'  // кроме SVG
    ];
    const destPath = 'app/images';

    // AVIF
    const avifStream = src(srcPattern, { base: 'app/images/src' })
        .pipe(newer(destPath))
        .pipe(avif({ quality: 90 }))
        .pipe(dest(destPath));

    // WebP
    const webpStream = src(srcPattern, { base: 'app/images/src' })
        .pipe(newer(destPath))
        .pipe(webp())
        .pipe(dest(destPath));

    // Оригиналы (PNG/JPG/GIF) — оптимизация
    const imgStream = src(srcPattern, { base: 'app/images/src' })
        .pipe(newer(destPath))
        .pipe(imagemin({
            progressive: true,
            interlaced: true
            // при необходимости можно добавить плагины для конкретных форматов
        }))
        .pipe(dest(destPath));

    // Чистая оптимизация SVG
    const svgStream = src('app/images/src/**/*.svg', { base: 'app/images/src' })
        .pipe(newer(destPath))
        .pipe(svgmin())    // минимизация SVG
        .pipe(dest(destPath));

    // Объединение всех трех потоков и стримим в браузер
    return merge(avifStream, webpStream, imgStream, svgStream)
        .pipe(browserSync.stream());

        /*
            Если нет необходимости придерживаться модульности (Разбивать картинки по папкам - секциями)
        */

    // return src(['app/images/src/*.*', '!app/images/src/*.svg'])
    //     .pipe(newer('app/images/'))
    //     .pipe(avif({ quality: 90 }))
    //
    //     .pipe(src('app/images/src/*.*'))
    //     .pipe(newer('app/images/'))
    //     .pipe(webp())
    //
    //     .pipe(src('app/images/src/*.*'))
    //     .pipe(newer('app/images/'))
    //     .pipe(imagemin())
    //
    //     .pipe(dest('app/images/'))
    //     .pipe(browserSync.stream())
}

function sprite() {
    return src('app/images/src/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images/'))
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery-ui/dist/jquery-ui.js',
        'node_modules/swiper/swiper-bundle.js',
        'app/js/swiper-init.js', // инициализация свайпера
        'app/js/accordion.js', // аккордеоны
        'app/js/cookie.js', // уведомление о куки
        'app/js/menu.js', // меню хедера
        'app/js/header.js', // скролл для хедера
        'app/js/table.js', // таблица с табами
        'app/js/title.js', // установка title
        'app/js/up-btn.js', // кнопка наверх
        'app/js/main.js' // основной файл javascript
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify({
            compress: true,
            mangle: false
        }))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))

        // без минификации
        // .pipe(scss({
        //     outputStyle: 'expanded'
        // }))

        // с минификацией
        .pipe(scss({
            outputStyle: 'compressed'
        }))

        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
    watch(['app/scss/**/*.scss'], styles);
    watch('app/images/src/**/*.*', images);    // было watch(['app/images/src'], images)
    watch(['app/js/main.js'], scripts);
    watch(['app/components/**/*.html', 'app/pages/**/*.html'], pages);
    watch(['app/*.html']).on('change', browserSync.reload);
    watch(['app/upload/**/*'], resources);
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        // 'app/css/style.min.css',
        'app/css/**/*.css',
        '!app/images/**/*.html',
        'app/images/*.*',
        // '!app/images/*.svg',
        // 'app/images/sprite.svg',
        'app/js/main.min.js',
        'app/*.html',
        'app/upload/**/*'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.images = images;
exports.pages = pages;
exports.building = building;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = series(styles, images, scripts, pages, watching);