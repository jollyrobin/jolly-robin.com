var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('./app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'));
});
 
gulp.task('default', function(){
	console.log('Hello')
});

gulp.task('build', function(){
	gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});

// Static server
gulp.task('serve', ['build', 'sass'], function() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});


	gulp.watch('./app/styles/**/*.scss', ['sass']);
	gulp.watch("app/**/*", ['build']);

	gulp.watch("dist/**/*").on('change', browserSync.reload);
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});