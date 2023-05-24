const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    singer: path.resolve(__dirname, 'src/singer.js'),
    player: path.resolve(__dirname, 'src/player.js')
  },
  output: {
    filename: '[name].[contenthash:8].js',
    clean: true,
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3002,
    host: '0.0.0.0',
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    open: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'singer.html',
      chunks: ['singer'],
      title: 'singer'
    }),
    new HtmlWebpackPlugin({
      filename: 'player.html',
      chunks: ['player'],
      title: 'player'
    })
  ]
}