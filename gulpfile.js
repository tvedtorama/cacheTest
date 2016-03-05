var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat')
const gulpBabel = require('gulp-babel');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');

function compile(fileSpec, output, folder) {
	return gulp.src(fileSpec)
		.pipe(sourcemaps.init())
		.pipe(gulpBabel({presets: ['react', 'es2015', 'stage-0']}))
		.pipe(concat(output))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(folder));
}

function compileRuntime(watch) {
  return compile(["./app/main.js"], 'build', watch);
}

function compileServer(watch) {
	return compile('./server/main.js', 'main.js', './build/server') 
}

function watch() {
  compileRuntime(true);
  // compileServer(true);
}

function watchForTests() {
  return compileForTests(true);
}

function sassIt(path) {
  console.log('sassing...')
  return gulp.src(path).
    pipe(sass().on('error', sass.logError)).
    pipe(gulp.dest('./build/css/'));
}

gulp.task('buildServer', function() { compileServer();  });
gulp.task('watch', function() { return watch(); });
gulp.task('watchForTests', function() { return watchForTests(); });



gulp.task('styles', function() {  
  var path = 'sass/**/*.scss'
  sassIt(path)
  gulp.watch(path, function () {
    sassIt(path)
  });
});


gulp.task('default', ['watch', 'styles']);
