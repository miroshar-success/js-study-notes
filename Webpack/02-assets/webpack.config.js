/*
动态打包所有依赖, 每个模块都可以明确表述它自身都依赖
打包css: css-loader style-loader
打包image: asset/resource
*/
const path = require('path');

module.exports = {
  mode:'none',
  entry:path.join(__dirname,'src/index.js'),
  output:{
    filename:'bundle.js',
    path:path.join(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader',{
          loader:'css-loader',
        }]
      },
      {
        test:/\.(png|jpg|jpeg|gif)$/,
        type:'asset/resource'
      }
    ]
  },
  devServer:{
    port:8080,
    open:true
  }
}
