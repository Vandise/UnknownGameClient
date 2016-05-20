var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      './src/scripts/router'
    ],
  },
  devtool: 'source-map',
  output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js",
  },
  resolveLoader: {
    modulesDirectories: ['..', 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size.
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.IgnorePlugin(/un~$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
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
  }
};