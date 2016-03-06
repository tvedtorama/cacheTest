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
	var bundlerRaw = browserify(file, { debug: true })
	var bundler = watch ? watchify(bundlerRaw) : bundlerRaw
	bundler.transform(babelify.configure({
        presets: ['react', 'es2015', 'stage-0']}))


	var rebundle = function() {
		return bundler
			.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.on('end', function() { console.log('Done browserifying'); })
			.pipe(source(file))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(folder));
	}
	bundler.on('update', rebundle)
	return rebundle()
}

function compile(fileSpec, output, folder) {
	return gulp
		.src(fileSpec)
		.on('end', function() { console.log('Done compiling'); })
		.pipe(sourcemaps.init())
		.pipe(gulpBabel({presets: ['react', 'es2015', 'stage-0']}))
		.pipe(concat(output))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(folder));
}

function compileRuntime(watch) {
  return compileBrowserify("./app/main.js", 'build/web', watch);
}

var serverPath = './server/main.js'

function compileServer() {
	return compile(serverPath, 'main.js', './build/server') 
}

function watchForTests() {
  return compileForTests(true);
}

function sassIt(path) {
  console.log('sassing...')
  return gulp.src(path).
    pipe(sass().on('error', sass.logError)).
    pipe(gulp.dest('./build/web/css/'));
}

gulp.task('buildServer', function() { return compileServer(); });
gulp.task('buildRuntime', function() { return compileRuntime(); });
gulp.task('watchServer', function() { return gulp.watch(serverPath, function() {compileServer()}) });
gulp.task('watchRuntime', function() { return compileRuntime(true); });
gulp.task('watchForTests', function() { return watchForTests(); });

var sassPath = 'sass/**/*.scss'

gulp.task('styles', function() {  
	return sassIt(sassPath)
	gulp.watch(sassPath, function () {
	 sassIt(sassPath)
	});
});

gulp.task('watchStyles', function() {  
	gulp.watch(sassPath, function () {
		sassIt(sassPath)
	});
});

gulp.task('build', ['buildRuntime', 'buildServer', 'styles'])
gulp.task('watch', ['styles', 'watchStyles', 'buildServer', 'watchServer', 'watchRuntime']);

gulp.task('default', ['watch', 'styles']);
