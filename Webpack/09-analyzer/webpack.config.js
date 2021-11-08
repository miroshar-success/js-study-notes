const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//---------------------------------------  未引入文件打包输出 ----------------------------------
/* module.exports = {
  mode:'development',
  entry:path.join(__dirname,'src/index.js'),
  devtool:'inline-source-map',
  output:{
    filename:'bundle.js',
    path:path.join(__dirname,'single-dist'),
    clean:true
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'hello world'
    })
  ]
} */

// -----------------------------------  引入了一个文件后的打包结果 ----------------------------------
/* module.exports = {
  mode:'none',
  entry:path.join(__dirname, 'src/index.js'),
  devtool:'hidden-source-map',
  output:{
    filename:'bundle.js',
    path:path.join(__dirname,'many-dist'),
    clean:true
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'hello world'
    })
  ]
} */

 // -------------------------------- commonjs打包结果   --------------------------------
/* module.exports = {
  mode:'none',
  entry:path.join(__dirname,'src/index.js'),
  devtool:'hidden-source-map',
  output:{
    filename:'bundle.js',
    path:path.join(__dirname, 'lazy-dist'),
    clean:true
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'hello world'
    })
  ]
} */


// ----------------------- 打包入口--------------
module.exports = {
  mode:'none',
  entry:path.join(__dirname,'src/index.js'),
  output:{
    filename:'bundle.js',
    path:path.join(__dirname,'entry'),
    clean:true
  },
  plugins:[
    new HtmlWebpackPlugin()
  ]
}
