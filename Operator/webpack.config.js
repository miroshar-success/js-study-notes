const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode:'none',
  entry:path.join(__dirname,'index.js'),
  output:{
    filename:'bundle.js',
    path:path.join(__dirname,'dist'),
    clean:true
  },
  devServer:{
    port:'9090',
    host:'0.0.0.0',
    static:path.join(__dirname,'dist'),
    hot: true
  },
  plugins:[
    new HtmlWebpackPlugin()
  ]
}
