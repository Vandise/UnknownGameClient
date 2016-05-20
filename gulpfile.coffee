gulp = require 'gulp'
webpack = require("webpack")
WebpackDevServer = require("webpack-dev-server")
webpackConfig = require("./webpack.config.js")
webpackProductionConfig = require("./webpack.production.config.js")
gutil = require 'gulp-util'
shell = require 'gulp-shell'

SCRIPTS_PATH = 'public/js';
PHASER_PATH = './node_modules/phaser/build/'

gulp.task('copy-assets', ->
    gulp.src('src/static/**')
      .pipe(gulp.dest('public'))
)

gulp.task "webpack:build", (callback) ->
  # Run webpack.
  webpack webpackProductionConfig, (err, stats) ->
    throw new gutil.PluginError("webpack:build", err)  if err
    gutil.log "[webpack:build]", stats.toString(colors: true)
    callback()
    return

# Create a single instance of the compiler to allow caching.
devCompiler = webpack(webpackConfig)
gulp.task "webpack:build-dev", (callback) ->

  # Run webpack.
  devCompiler.run (err, stats) ->
    throw new gutil.PluginError("webpack:build-dev", err)  if err
    gutil.log "[webpack:build-dev]", stats.toString(colors: true)
    callback()
    return

  return

devServer = {}
gulp.task "webpack-dev-server", (callback) ->
  # Start a webpack-dev-server.
  devServer = new WebpackDevServer(webpack(webpackConfig),
    contentBase: './public/'
    hot: true
    watchOptions:
      aggregateTimeout: 100
    noInfo: true
  )
    
  devServer.listen 9090, "0.0.0.0", (err) ->
    throw new gutil.PluginError("webpack-dev-server", err) if err
    gutil.log "[webpack-dev-server]", "http://localhost:9090"
    callback()
    
  return

gulp.task 'default', -> gulp.start 'build'

gulp.task 'build', ['webpack:build', 'copy-assets']

gulp.task 'watch', ['copy-assets', 'webpack-dev-server'], ->
  gulp.watch(['assets/**'], ['copy-assets'])

gulp.task 'test', shell.task ['./node_modules/.bin/mocha']

# Explicitly return true if mocha fails, so Gulp won't quit.
gulp.task 'test:safe', shell.task ['./node_modules/.bin/mocha || true']
gulp.task 'test:watch', ['test:safe'], ->
  gulp.watch ['src/scripts/**','test/**'], ['test:safe']