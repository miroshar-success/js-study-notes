const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports = {
//   entry: path.join(__dirname,'src/index.js'),
//   mode:'development',
//   devtool:'eval',
//   output:{
//     filename:'bundle.js',
//     path:path.join(__dirname,'dist'),
//     clean:true
//   },
//   plugins:[
//     new HtmlWebpackPlugin({
//       title:'hello world'
//     })
//   ],
//   devServer:{
//     port:'5050',
//     host:'0.0.0.0',
//     static:path.join(__dirname,'dist'),
//     compress:true
//   }
// }


// 比较每个sourceMap

// eval 不会生成sourceMap, 将模块代码放到eval函数执行，携带一个url标注 sourceMap的文件路径

// eval-source-map  定位到行 列信息
// cheap-eval-source-map  定位行问题,没有列信息
// cheap-module-eval-source-map 定位行问题, 显示源代码
const modes = [
  'eval','eval-cheap-source-map','eval-cheap-module-source-map','eval-source-map','cheap-source-map',
  'cheap-module-source-map','source-map','inline-cheap-source-map', 'inline-cheap-module-source-map',
  'inline-source-map', 'eval-nosources-cheap-source-map'
]

module.exports = modes.map(item => {
  return {
    entry:path.join(__dirname,'src/index.js'),
    devtool:item,
    mode:'none',
    output:{
      filename:`js/${item}.js`,
      path:path.join(__dirname,'dist'),
      clean:true
    },
    // module:{
    //   rules:[
    //     {
    //       test:/\.js$/,
    //       use:[
    //         {
    //           loader:'babel-loader',
    //           options:{
    //             presets:['@babel/preset-env']
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // },
    plugins:[
      new HtmlWebpackPlugin({
        filename:`${item}.html`
      })
    ]
  }
})
