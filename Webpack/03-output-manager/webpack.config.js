const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* html-webpack-plugin */
module.exports = {
  mode:'none',
  entry:{
    index:path.join(__dirname,'src/index.js'),
    print:path.join(__dirname,'src/print.js')
  },
  output:{
    filename:'[name].bundle.js',
    path:path.join(__dirname,'dist'),
    clean:true,  // 清理之前的dist 目录
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'管理输出',  // 标题
      filename:'index.html', // 生成的文件名,默认index.html
      template:path.join(__dirname,'src/template.html'),
      inject:'body',
      publicPath:'',
      scriptLoading:'defer',  // default defer
      favicon:path.join(__dirname,'src/assets/code.png'), // icon
      minify:false,  // 压缩
      hash:true,
      // base:'http://wwww.example'
    })
  ]
}
