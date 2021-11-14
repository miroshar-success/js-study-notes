const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode:'development',
  entry:path.join(__dirname, 'src/core.js'),
  output:{
    filename:'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'virtual dom'
    })
  ],
  devServer :{
    port:'9090',
    host:'0.0.0.0',
    static: path.join(__dirname, 'dist'),
    open: true
  }
}
