/*
 * 
 * Определяем переменные 
 *
 */

var gulp = require('gulp'), // Сообственно Gulp JS
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'), // Склейка файлов
    imagemin = require('gulp-imagemin'), // Минификация изображений
    csso = require('gulp-csso'), // Минификация CSS
    sass = require('gulp-sass'); // Конверстация SASS (SCSS) в CSS
	connect = require('gulp-connect');// локальный веб сервер //


/*
 * 
 * Создаем задачи (таски) 
 *
 */

// Задача "sass". Запускается командой "gulp sass"
gulp.task('sass', function () { 
	gulp.src('./app/styles/*.scss') // файл, который обрабатываем
		.pipe(sass().on('error', sass.logError)) // конвертируем sass в css
		.pipe(csso()) // минифицируем css, полученный на предыдущем шаге
		.pipe(gulp.dest('dist/css')); // результат пишем по указанному адресу
});

// Задача "js". Запускается командой "gulp js"
gulp.task('js', function() {
    return gulp
        .src('app/js/**/*')
        .pipe(gulp.dest('dist/js/'));
});
// Задача "img". Запускается командой "gulp img"
gulp.task('images', function() {
    gulp.src('./app/img/**/*') // берем любые файлы в папке и ее подпапках
        .pipe(imagemin()) // оптимизируем изображения для веба
        .pipe(gulp.dest('./dist/img/')) // результат пишем по указанному адресу

});

gulp.task('html', function () {
    gulp.src('app/**/*.html')
        // .pipe(connect.reload());
});

gulp.task('fonts', function() {
    return gulp
        .src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('connect', function() {
    connect.server({
    	root: "./dist",
        port: 4000,
        livereload: true
    });
});

gulp.task('templates', function() {
    return gulp
        .src('app/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-git', function() {
    return gulp
        .src('dist/**/*')
        .pipe(gulp.dest('.././skobec.github.io/portfol/zenit-landing/'));
});
// Задача "watch". Запускается командой "gulp watch"
// Она следит за изменениями файлов и автоматически запускает другие задачи
gulp.task('watch', function () {
	// При изменение файлов *.scss в папке "styles" и подпапках запускаем задачу sass
	gulp.watch('./app/styles/**/*.scss', ['sass']);
	// При изменение файлов *.js папке "js" и подпапках запускаем задачу js
	gulp.watch('./app/js/**/*.js', ['js']);
	// При изменение любых файлов в папке "img" и подпапках запускаем задачу img
	gulp.watch('./app/img/**/*', ['images']);
	// Отслеживаем изменения страниц
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/**/*.html'], ['templates']);

});



gulp.task('default', ['connect', 'watch', 'images', 'js', 'templates', 'sass', 'html', 'fonts']);