const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: path.resolve(__dirname, 'src', 'index.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },

  devServer: {
    port: 4000,
    contentBase: path.resolve(__dirname, 'src')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}