var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();

gulp.task('default', function(){
	console.log('Hello')
});

gulp.task('build', function(){
	gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});

// Static server
gulp.task('serve', ['build'], function() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});

	gulp.watch("app/**/*", ['build']);

	gulp.watch("dist/**/*").on('change', browserSync.reload);
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});