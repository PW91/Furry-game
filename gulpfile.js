var gulp = require("gulp"),
	sass = require("gulp-sass"),
	sourcemaps = require("gulp-sourcemaps"),
	autoprefixer = require('gulp-autoprefixer');

gulp.task("sass", function () {
	return gulp.src("sass/main.scss")
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: "compressed"
		}))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			browsers: ["> 1%", "last 2 versions", "Firefox ESR"]
		}))
		.pipe(gulp.dest("css/"));
})

gulp.task("watch", function () {
	gulp.watch("sass/*.scss", ["sass"]);
})