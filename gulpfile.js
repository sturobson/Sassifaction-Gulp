// Deep Breaths //
//////////////////

	// Gulp
	var gulp = require('gulp');

	// Sass/CSS stuff
	var sass = require('gulp-sass');
	var prefix = require('gulp-autoprefixer');
	var minifycss = require('gulp-minify-css');
	var rev = require('gulp-rev');

	// JavaScript
	var uglify = require('gulp-uglify');

	// Images
	var svgmin = require('gulp-svgmin');
	var imagemin = require('gulp-imagemin');

	// Stats and Things
	var size = require('gulp-size');

//

	// compile all your Sass
		gulp.task('sass', function (){
			gulp.src(['./dev/sass/*.scss', '!./dev/sass/_variables.scss'])
				.pipe(sass({
					includePaths: ['./dev/sass'],
					outputStyle: 'expanded'
				}))
				.pipe(prefix(
					"last 1 version", "> 1%", "ie 8", "ie 7"
					))
				.pipe(gulp.dest('./dev/css'))
				.pipe(minifycss())
				.pipe(rev())
				.pipe(gulp.dest('./prod/css'));
		});

	// Uglify JS
		gulp.task('uglify', function(){
			gulp.src('./dev/js/*.js')
				.pipe(uglify())
				.pipe(gulp.dest('./prod/js'));
		});

	// SVG
		gulp.task('svgmin', function() {
			gulp.src('./dev/img/svg/*.svg')
			.pipe(svgmin())
			.pipe(gulp.dest('./dev'));
		});

	// Images
		gulp.task('imagemin', function () {
			gulp.src('./dev/img/*')
			.pipe(imagemin())
			.pipe(gulp.dest('./dev/img'))
			.pipe(gulp.dest('./prod/img'));
		});

	// Stats and Things
		gulp.task('stats', function () {
			gulp.src('./prod/**/*')
			.pipe(size())
			.pipe(gulp.dest('./prod'));
		});

//

	gulp.task('default', function(){

		// watch me getting Sassy
		gulp.watch("./dev/sass/**/*", function(event){
			gulp.run('sass');
		});
		// make my JavaScript ugly
		gulp.watch("./dev/js/**/*", function(event){
			gulp.run('uglify');
		});
		// SVG
		gulp.watch("./dev/img/svg/**/*", function(event){
			gulp.run('svgmin');
		});
		// images
		gulp.watch("./dev/img/**/*", function(event){
			gulp.run('imagemin');
		});
	});
