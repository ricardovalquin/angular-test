var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;
var reload = browserSync.reload;

gulp.task('injectAppFiles', function(){
  var sources = gulp.src(['./assets/css/**/*.css'], {read: false});
  var target = gulp.src('./index.html');

  return target.pipe($.inject(gulp.src(['./assets/css/**/*.css'], {read: false}), {ignorePath: 'app', addRootSlash: false}))
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


// gulp.task('scripts', () =>{
//   return gulp.src('./**/*.js')
//     .pipe($.plumber())
//     .pipe($.sourcemaps.init())
//     .pipe($.babel())
//     .pipe($.sourcemaps.write('.'))
//     .pipe(gulp.dest('.tmp/scripts'))
//     .pipe(reload({stream: true}));
// });

// gulp.task('images', () => {
//   return gulp.src('app/assets/img/**/*')
//     .pipe($.cache($.imagemin({
//       progressive: true,
//       interlaced: true,
//       // don't remove IDs from SVGs, they are often used
//       // as hooks for embedding and styling
//       svgoPlugins: [{cleanupIDs: false}]
//     })))
//     .pipe(gulp.dest('dist/images'));
// });

// gulp.task('fonts', () => {
//   return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
//     .concat('app/assets/fonts/**/*'))
//     .pipe(gulp.dest('.tmp/fonts'))
//     .pipe(gulp.dest('dist/fonts'));
// });

gulp.task('serve', ['styles', 'injectAppFiles'], function(){
  browserSync.init({
      server: './'
  });
  gulp.watch('./assets/css/**/*.scss', ['styles']);
  gulp.watch('./**/*.html').on('change', reload);
});















