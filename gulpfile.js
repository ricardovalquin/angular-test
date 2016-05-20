var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var friendlyFormatter = require("eslint-friendly-formatter");
var mainBowerFiles = require('main-bower-files');
var reload = browserSync.reload;


var eslintErrorOccured   = false;


gulp.task('bower-inject', function(){
  gulp.src('./index.html')
    .pipe($.inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower', relative: true}))
    .pipe(gulp.dest('./'))
});

gulp.task('injectAppFiles', function(){
  var sources = gulp.src(['./assets/css/**/*.css','./**/*.js'], {read: false});
  var target = gulp.src('./index.html');

  return target.pipe($.inject(gulp.src(['./assets/css/**/*.css', './app/**/*.js'], {read: false}), {ignorePath: 'app', addRootSlash: false}))
    .pipe(gulp.dest('./'))
});

gulp.task('styles', function(){
   gulp.src('./assets/css/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }))
    //.pipe($.shorthand)
    .pipe($.autoprefixer('last 2 versions', 'safari 5', 'ie6', 'ie7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //.pipe($.cssmin)
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browserSync.stream({match: '**/*.css'}));
    //notify
});

var jsCustomSRC = ['./app/**/*.js', '!node_modules/**/*.js'];

gulp.task('lint', function () {
  return gulp.src(jsCustomSRC)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    .pipe($.plumber({
      errorHandler: function (err) {
        eslintErrorOccured = true;
        $.notify.onError({
          title:    "Eslint Error",
          message:  "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))
    .pipe(eslint.results(function (results) {
      // Called once for all ESLint results.
      console.log('Total Results: ' + results.length);
      console.log('Total Warnings: ' + results.warningCount);
      console.log('Total Errors: ' + results.errorCount);

      if(results.errorCount){
        throw new gutil.PluginError({
          plugin: eslint,
          message: 'Error: Please check your js files!'
        });
      }

    }))

    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format(friendlyFormatter))
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('js-watch', ['lint'], browserSync.reload);



gulp.task('serve', ['styles', 'injectAppFiles', 'bower-inject'], function(){
  browserSync.init({
      server: './'
  });
  gulp.watch('./assets/css/**/*.scss', ['styles']);
  gulp.watch("./app/**/*.js", ['js-watch']);
  gulp.watch('./**/*.html').on('change', reload);
});















