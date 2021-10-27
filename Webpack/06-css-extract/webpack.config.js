const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
// const webpack = require('webpack')

module.exports = {
  entry:path.join(__dirname,'src/index.js'),
  mode:'none',
  output:{
    filename:'bundle.js',
    path:path.join(__dirname, 'dist'),
    clean: true
  },
  devServer:{
    port:'8082',
    hot:true,
    static:path.join(__dirname, 'dist'),
    compress:true,
    open:true
  },
  module:{
    rules:[
      {
        test:/\.css$/i,
        use:[{
          loader:MiniCssExtractPlugin.loader
        }, 'css-loader']
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({title:'hello world'}),
    new MiniCssExtractPlugin({
      //filename:'[name]-[hash].css',  // This option determines the name of each output Css file
      //filename:'[name]-[chunkhash:8].css', //This option determines the name of non-entry chunk files
      filename:'[name]-[contenthash:8].css',
      //chunkFilename:'[name]-[hash].css',
      ignoreOrder:false // remove order warnings
    }),
    new OptimizeCssPlugin() // 压缩css文件
  ]
}
