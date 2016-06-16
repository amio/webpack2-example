const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const PROD = (process.env.NODE_ENV === 'production')

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist',
    filename: 'bundle.min.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, '/js'),
      loaders: ['babel']
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("css?sourceMap!postcss")
    },{
      test: /\.png$/,
      loader: "url-loader?limit=99999"
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new ExtractTextPlugin("[name].css")
  ],
  postcss: function () {
    return [
      // precss(),
      autoprefixer({browsers: ['last 3 versions', 'iOS 8', 'Android 4']})
    ]
  },
  devServer: {
    hot: true,
    inline: true
  }
}
