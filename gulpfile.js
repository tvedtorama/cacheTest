var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat')
const gulpBabel = require('gulp-babel');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');


function compileBrowserify(file, folder, watch) {
	var bundler = watchify(browserify(file, { debug: true }).transform(babelify.configure({
        presets: ['react', 'es2015', 'stage-0']})))

	return bundler.bundle()
	  .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(file))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(folder));
}

function compile(fileSpec, output, folder) {
	return gulp.src(fileSpec)
		.pipe(sourcemaps.init())
		.pipe(gulpBabel({presets: ['react', 'es2015', 'stage-0']}))
		.pipe(concat(output))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(folder));
}

function compileRuntime(watch) {
  return compileBrowserify("./app/main.js", 'build/web');
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

gulp.task('buildServer', function() { return compileServer(); });
gulp.task('buildRuntime', function() { return compileRuntime(); });
gulp.task('watch', function() { return watch(); });
gulp.task('watchForTests', function() { return watchForTests(); });

gulp.task('styles', function() {  
  var path = 'sass/**/*.scss'
  sassIt(path)
  gulp.watch(path, function () {
    sassIt(path)
  });
});

gulp.task('build', ['buildRuntime', 'buildServer'])

gulp.task('default', ['watch', 'styles']);
