const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    // 浏览器报错 React is not defined
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    static: path.resolve(__dirname, 'dist'),
    compress: true
  }
}
// babel-profill  包括core-js和generator等
// 可能导致全局状态污染
// babel-transform-runtime