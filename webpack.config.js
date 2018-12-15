const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    index: './src/index.tsx'
  },

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },

  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'babel-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'css-loader' }
    ]
  },

  devServer: {
    open: true,
    port: 4000,
    contentBase: path.resolve(__dirname, 'src')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}