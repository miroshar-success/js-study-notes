const path = require('path')
/*
1. 代码分离
第一种方式: 使用entry配置手动分离代码 缺点:如果入口chunk之间包含一些重复的模块,重复模块会被引入到各个bundle.js中。
*/
// module.exports = {
//   mode:'development',
//   devtool:'inline-source-map',
//   entry:{
//     index:path.join(__dirname,'src/index.js'),
//     main:path.join(__dirname,'src/main.js')
//   },
//   output:{
//     filename:'[name].bundle.js',
//     path:path.join(__dirname,'dist'),
//     clean:true
//   },
//   devServer:{
//     static:path.join(__dirname,'dist'),
//     port:'5050',
//     compress:true,
//   }
// }


/*
入口依赖: 配置dependOn option选项,这样可以在多个chunk之间共享模块:
*/
// module.exports = {
//   mode:'development',
//   devtool:'inline-source-map',
//   entry:{
//     index:{
//       import:path.join(__dirname,'src/index.js'),
//       dependOn:'shared'
//     },
//     main:{
//       import:path.join(__dirname,'src/main.js'),
//       dependOn:'shared'
//     },
//     shared:'vue'
//   },
//   output:{
//     filename:'[name].bundle.js',
//     path:path.join(__dirname,'dist'),
//     clean:true
//   },
//   devServer:{
//     static:path.join(__dirname,'dist'),
//     port:'5050',
//     compress:true,
//   }
// }

/*
splitChunkPlugin
*/
// module.exports = {
//   mode:'development',
//   devtool:'inline-source-map',
//   entry:{
//     index:path.join(__dirname,'src/index.js'),
//     main:path.join(__dirname,'src/main.js')
//   },
//   output:{
//     filename:'[name].bundle.js',
//     path:path.join(__dirname,'dist'),
//     clean:true
//   },
//   optimization:{
//     splitChunks:{
//       chunks:'all'
//     }
//   }
// }


/*
--------------------- 使用符合ECMAScript提案的 import()语法实现动态导入。-----------------
*/
// module.exports = {
//   mode:'development',
//   devtool:'inline-source-map',
//   entry:path.join(__dirname,'src/index.js'),
//   output:{
//     path:path.join(__dirname,'dist'),
//     filename:'[name].bundle.js',
//     clean:true
//   }
// }


//  ---------------------   多入口打包 ---------------------
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode:'none',
  entry:{
    index:path.join(__dirname,'src/index.js'),
    main:path.join(__dirname,'src/main.js')
  },
  output:{
    filename:'[name].bundle.js',
    path:path.join(__dirname,'dist'),
    clean:true
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'index',
      filename:'index.html',
      hash:true,
      chunks:['index']
    }),
    new HtmlWebpackPlugin({
      title:'main',
      filename:'main.html',
      hash:true,
      chunks:['main']
    })
  ]
}

