var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var shell = require('gulp-shell')

var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
.pipe(sass())
.pipe(gulp.dest("src/css"))
.pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/@popperjs/core/dist/umd/popper.min.js'])
.pipe(gulp.dest("src/js"))
.pipe(browserSync.stream());
});

//optimizing images
// gulp.task('imagemin',async function() {
//     var imgSrc = 'src/images/*.+(png|jpg|gif)',
//     imgDst = 'build/images';
    
//     gulp.src(imgSrc)
//     .pipe(changed(imgDst))
//     .pipe(imagemin())
//     .pipe(gulp.dest(imgDst));
//  });

// Static Server + watching scss/html files
gulp.task('serve', gulp.series( 'sass', function() {

browserSync.init({
server: "./src"
});

gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
gulp.watch("src/*.html").on('change', browserSync.reload);
}));


//deploy to firebase
gulp.task('firebase', shell.task([
    'firebase deploy'
]))

gulp.task('default',gulp.series('js','firebase','serve',));
