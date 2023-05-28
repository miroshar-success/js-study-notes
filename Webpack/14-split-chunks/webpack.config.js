const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
// ---------------- 多入口 --------------
/* module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
    player: path.resolve(__dirname, 'src/player.js'),
    singer: path.resolve(__dirname, 'src/singer.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
} */

// ------------------- 单入口 -----------------
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          minSize: 0,
          priority: 1,
          minChunks: 1, // 最少重复过几次
        },
        common: {
          name: 'common',
          minSize: 0,
          minChunks: 2, // 最少使用几次
          priority: 0
        }
      }
    }
  }
}