/* jshint node: true, strict: true */
'use strict';

/*=====================================
=        Default Configuration        =
=====================================*/

// Please use config.js to override these selectively:

var config = {
  dest: 'www',
  less: {
    src: [
      './src/less/app.less'
    ],
    paths: [
      './src/less',
      './bower_components'
    ]
  },
  vendor: {
    js: [
      './bower_components/jquery/jquery.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-route/angular-route.js',
      './bower_components/angular-ui/build/angular-ui.js',
    ],

    css: {
      prepend: [
        './bower_components/angular-ui/build/angular-ui.css',
        './bower_components/bootstrap/dist/css/bootstrap.css',
        './bower_components/bootstrap/dist/css/bootstrap-theme.css'
      ],
      append: [

      ],
    },

    fonts: [
      './bower_components/bootstrap/fonts/glyphicons-halflings-regular.*'
    ]
  }
};

if (require('fs').existsSync('./config.js')) {
  var configFn = require('./config');
  configFn(config);
}

/*-----  End of Configuration  ------*/


/*========================================
=            Requiring stuffs            =
========================================*/

var gulp           = require('gulp'),
    seq            = require('run-sequence'),
    connect        = require('gulp-connect'),
    less           = require('gulp-less'),
    uglify         = require('gulp-uglify'),
    sourcemaps     = require('gulp-sourcemaps'),
    cssmin         = require('gulp-cssmin'),
    order          = require('gulp-order'),
    concat         = require('gulp-concat'),
    gap            = require('gulp-append-prepend'),
    ignore         = require('gulp-ignore'),
    rimraf         = require('gulp-rimraf'),
    templateCache  = require('gulp-angular-templatecache'),
    mobilizer      = require('gulp-mobilizer'),
    ngAnnotate     = require('gulp-ng-annotate'),
    replace        = require('gulp-replace'),
    ngFilesort     = require('gulp-angular-filesort'),
    streamqueue    = require('streamqueue'),
    rename         = require('gulp-rename'),
    path           = require('path');


/*================================================
=            Report Errors to Console            =
================================================*/

gulp.on('error', function(e) {
  throw(e);
});


/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function (cb) {
  return gulp.src([
        path.join(config.dest, 'favicon.ico'),
        path.join(config.dest, '.htaccess'),
        path.join(config.dest, 'index.html'),
        path.join(config.dest, 'images'),
        path.join(config.dest, 'css'),
        path.join(config.dest, 'js'),
        path.join(config.dest, 'fonts')
      ], { read: false })
     .pipe(rimraf());
});

/*=========================================
=            Copy php files and .htaccess            =
=========================================*/

gulp.task('copy', function() {
    gulp.src(['./src/.htaccess', './src/favicon.ico'])
    .pipe(gulp.dest(config.dest));
});

/*==============================================================
=            Setup live reloading on source changes            =
==============================================================*/

gulp.task('livereload', function () {
  gulp.src(path.join(config.dest, '*.html'))
    .pipe(connect.reload());
});


/*=====================================
=            Minify images            =
=====================================*/

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
        .pipe(gulp.dest(path.join(config.dest, 'images')));
});


/*==================================
=            Copy fonts            =
==================================*/

gulp.task('fonts', function() {
  return gulp.src(config.vendor.fonts)
  .pipe(gulp.dest(path.join(config.dest, 'fonts')));
});


/*=================================================
=            Copy html files to dest              =
=================================================*/

gulp.task('html', function() {
  var inject = [];
  gulp.src(['src/index.html', 'src/**/*.html'])
  .pipe(gulp.dest(config.dest));
});


/*======================================================================
=            Compile, minify, mobilize less                            =
======================================================================*/

gulp.task('less', function () {
    return gulp.src(config.less.src)
    .pipe(less({
      paths: config.less.paths.map(function(p){
        return path.resolve(__dirname, p);
      })
    }))
    .pipe(gap.prependFile(config.vendor.css.prepend))
    .pipe(gap.appendFile(config.vendor.css.append))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.dest, 'css')));
});


/*====================================================================
=            Compile and minify js generating source maps            =
====================================================================*/
// - Orders ng deps automatically
// - Precompile templates to ng templateCache

gulp.task('js', function() {
    streamqueue({ objectMode: true },
      gulp.src(config.vendor.js),
      gulp.src(['./src/**/*.js', './src/app.js']).pipe(ngFilesort()),
      gulp.src(['src/**/*.html']).pipe(templateCache({ module: 'myApp' }))
    )
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.dest, 'js')));
});

gulp.task('devjs', function() {
    streamqueue({ objectMode: true },
      gulp.src(config.vendor.js),
      gulp.src(['./src/**/*.js', './src/app.js']).pipe(ngFilesort()),
      gulp.src(['src/**/*.html']).pipe(templateCache({ module: 'myApp' }))
    )
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    //.pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dest, 'js')));
});


/*===================================================================
=            Watch for source changes and rebuild/reload            =
===================================================================*/

gulp.task('watch', function () {
  if (typeof config.server === 'object') {
    gulp.watch([config.dest + '/**/*'], ['livereload']);
  }
  gulp.watch(['./src/html/**/*'], ['html']);
  gulp.watch(['./src/less/**/*'], ['less']);
  gulp.watch(['./src/js/**/*', config.vendor.js], ['js']);
  gulp.watch(['./src/images/**/*'], ['images']);
});


/*===================================================
=            Starts a Weinre Server                 =
===================================================*/

gulp.task('weinre', function() {
  if (typeof config.weinre === 'object') {
    var weinre = require('./node_modules/weinre/lib/weinre');
    weinre.run(config.weinre);
  } else {
    throw new Error('Weinre is not configured');
  }
});


/*======================================
=            Build Sequence            =
======================================*/

gulp.task('build', function(done) {
  var tasks = ['html', 'fonts', 'images', 'less', 'js'];
  seq('clean', tasks, 'copy', done);
});

gulp.task('devbuild', function(done) {
  var tasks = ['html', 'fonts', 'images', 'less', 'devjs'];
  seq('clean', tasks, 'copy', done);
});


/*====================================
=            Default Task            =
====================================*/

gulp.task('default', function(done){
  var tasks = [];

  if (typeof config.weinre === 'object') {
    tasks.push('weinre');
  }

  if (typeof config.server === 'object') {
    tasks.push('connect');
  }

  tasks.push('watch');

  seq('build', tasks, done);
});
