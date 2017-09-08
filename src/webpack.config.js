var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'js/app'),
  output: {
    path: path.join(__dirname, '../public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      loader: ['style-loader','css-loader','sass-loader']
    }]
  },
  resolve: {
    alias: {
      'jquery': path.join(__dirname,'js/lib/jquery-3.2.1.min.js'),
      'mob': path.join(__dirname, 'js/mob'),
      'css': path.join(__dirname,'css')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
}