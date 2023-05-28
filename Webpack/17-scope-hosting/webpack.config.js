/**
 * ModuleConcatenationPlugin This plugin is already enabled in production mode and disabled otherwise.
 * If you need to override the production mode optimization, set the optimization.concatenateModules option to false
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { webpack } = require('webpack')

module.exports = {
  mode: 'production',
  devtool: 'inline-cheap-module-source-map',
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    compress: true,
    static: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  optimization: {
    concatenateModules: false,
    minimize: false
  }
}