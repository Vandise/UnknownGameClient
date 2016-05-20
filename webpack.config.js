var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "webpack-dev-server/client?http://0.0.0.0:9090",
    'webpack/hot/only-dev-server',
    './src/scripts/router'
  ],
  devtool: 'source-maps',
  debug: true,
  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/)
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.sass']
  },
  module: {
    loaders: [
      { test: /\.coffee$/,  loader: 'coffee' },
      { test: /\.jsx?$/,    loader: 'react-hot!babel', include: path.join(__dirname, 'src') },
      { test: /\.sass$/,    loader: 'style!css!sass?indentedSyntax' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  node: {
    fs: "empty"
  }
};