const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

// --------------------------- contenthash runtimeChunk 以及cacheGroups ---------------------------
/* module.exports = {
  mode:'none',
  entry:path.join(__dirname,'src/index.js'),
  output:{
    // substitution(可替换模板字符串的方式) [contenthash]将根据资源内容创建出唯一hash,
    // 当资源内容发生变化时,[contenthash]也会发生变化

    filename:'[name].[contenthash:8].js',
    path:path.join(__dirname,'dist'),
    clean:true
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader', 'css-loader']
      },
      {
        test:/\.vue$/,
        use:['vue-loader']
      }
    ]
  },
  devServer:{
    hot:true,
    open:true,
    static:path.join(__dirname,'dist'),
    compress:true,
    port:'9090',
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'webpack-demo'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify('development')
    })
  ],
  optimization:{
    splitChunks:{
      cacheGroups:{
        vendor:{
          test:/[\\/]node_modules[\\/]/,
          name:'chunk-vendors',
          chunks:'all'
        }
      }
    },
    runtimeChunk:'single'
  }
} */


// ------------------------------------ 模块标识符 ---------------------------------------
module.exports = {
  mode:'none',
  entry:path.join(__dirname,'src/index.js'),
  output:{
    filename:'[name].[contenthash:8].js',
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
  devServer:{
    open:true,
    host:'0.0.0.0',
    port:'9090',
    static:path.join(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'模块标识符'
    })
  ],
  optimization:{
    moduleIds:'deterministic',
    runtimeChunk:'single',
    splitChunks:{
      cacheGroups:{
        vendor:{
          // 处理文件路径时,始终包含Unix系统中的/ 和 windows系统中的\.
          test:/[\\/]node_modules[\\/]/,
          name:'chunk-vendors',
          chunks:'all'
        }
      }
    }
  }
}
