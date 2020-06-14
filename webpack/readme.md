# 概念

    本质上，webpack是一个现代JavaScript应用程序的静态模块打包器(module bundler).当webpack处理应用程序时,
    它会递归地构建一个依赖关系图,其中包含应用程序需要的每个模块。然后将所有这些模块打包成一个或多个bundle。
        
        入口(entry)
        出口(output)
        loader
        插件(plugins)
    
    在webpack的配置中loader有两个目标:
        1. test属性,用于标识出应该被对应的loader进行转换的莫哥或某些文件
        2. use属性,表示进行转换时,应该使用哪个loader。
        
# 安装
    
    install:
        npm install --save-dev webpack
        npm install --save-dev webpack@<version>
    
    version:
        webpack -v
        
        npm install --save-dev webpack-cli  安装脚手架
```json
"scripts": {
    "start": "webpack --config webpack.config.js"
}
```
    会在本地node_modules目录中查找安装的webpack。
    
## webpack基本配置
    
    webpack可以使用loader来预处理文件。这允许你打包初JavaScript之外的任何静态资源。
    
```js
// webpack.config.js

module.exports = {
    // 配置入口文件
    entry:{},
//  出口文件
    output:{},
// 模块，例如解读css 图片 和 压缩代码
    module:{},
// 插件，用于生产模版和各项功能
    plugins:[],
// 配置webpack开发服务功能
    devServer:{}
}
```
    多入口文件配置：
```js
const path = `require`('path');
module.exports={
    //入口文件的配置项
    entry:{
        entry:'./src/entry.js',
        //这里我们又引入了一个入口文件
        entry2:'./src/entry2.js'
    },
    //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'[name].js'
    }
}
```
    [name]的意思 是根据入口文件的名称,打包成相同的名称文件。
    
```js
// package.json

"scripts": {
    "server": "webpack-dev-server --open",
    "build":"webpack"
  },
```
    使用 npm run build 可以打包
    
### webpack-dev-server

    yarn add webpack-dev-server --save-dev
```js
// webpack.config.js
devServer:{
    contentBase:path.resolve(__dirname,'dist'),
    host:'0.0.0.0',
    compress:true,
    port:9000
}

// package.json
"scripts":{
    "server":"webpack-dev-server"
}
```
    contentBase: 配置服务器基本运行路径，用于找到程序打包地址
    host: 运行地址
    port: 运行端口
    compress: 服务器端压缩选型。
    
    配置好后，启动 :
        $ npm run server 命令
    
## 资源管理

    css 打包：
        loaders基本配置项：
            1. test 用于匹配处理文件扩展名的表达式
            2. use: loader名称
            3. include/exclude：手动添加需要处理的文件
            4. query: 为loaders提供额外的设置选项。
    
    安装css loader:
        npm instal style-loader --save-dev
                Adds CSS to the DOM by injecting a <style> tag

        npm install css-loader --save-dev
                css-loader解释@import 和 url()。会 import/require()后再解析他们。
                
        tips:
            1. 在配置时，style-loader 要写在 css-loader的前面。
```js
// Usage:
{
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:"style-loader"},
                    {loader:'css-loader'}
                ]
            },{
                test:/\.sass$/,
                use:['sass-loader']
            }         
        ]
    }
}

// 或者
module:{
    rules:[
        {
            test:/\.css$/,
            use:['style-loader','css-loader']
        }
    ]
}
```
    打包sass时需要安装 node-sass 和 sass-loader,因为sass-loader依赖于 node-sass
        yarn add node-sass sass-loader --save-dev


    js 代码压缩：
        安装 uglifyjs-webpack-plugin 
        npm install uglifyjs-webpack-plugin --save-dev
```js
// webpack.config.js
const uglify = require('uglifyjs-webpack-plugin');
{
    plugins:[
        new uglify()
    ]
}
```

    打包html文件
        npm install html-webpack-plugin --save-dev
        
        npm install html-loader --save-dev
            可以用来处理html文件中 img 标签图片地址 引用路径问题。
```js
// webpack.config.js
{
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:"index_bundle.js"
    },  
    plugins:[
        new htmlPlugin({
            minify:{removeAttributeQuotes:true},    // 去掉html里的双引号
            hash:true,  // 为了防止开发中js有缓存
            template:'./src/index.html' // 打包的html模版路径和文件名称
        })
    ]
}
``` 
    如果有多个webpack入口点,他们都会在生成HTML文件中的script标签内。如果有任何CSS asets在webpack的输出，
    那么这些将会包含在HTML head中的 link标签内。


    打包js
        yarn add uglifyjs-webpack-plugin --save-dev
           tips: 需要es6的支持,同时需要安装:
           yarn add babel-loader babel-core babel-preset-es2015 --save-dev
```js
// webpack.config.js
const UglifyJsPlugin = require('gulifyjs-webpack-plugin');

module.exports = {
    plugins:[
        new UglifyJsPlugin()
    ],
    module:{
        rules:[
            { 
                test:/\.js/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['es2015']}
                    }
                ]}
        ]       
    }
}
```

    打包图片：
        npm install file-loader --save-dev
            instructs webpack to emit the required object as file and to return its public URL
            
        npm install url-loader --save-dev
            Loads files as base64 encoded URL.
```js
// webpack.config.js;
// Usage
module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
}
```
    分离 CSS  extract-text-webpack-plugin
        
        yarn add extract-text-webpack-plugin --save-dev
    会将所有入口chunk中引用的.css 移动到独立分离的css文件。因此你的样式将不再内嵌到 JS bundle中。而是会放到一个单独到css文件。
```js
// Usage

const ExtractTextPlugin = require('extrack-text-webpack-plugin');

module.exports = {
    module:{
        rules:[
              {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
              }
        ]
    },
    plugins:[new ExtractTextPlugin('style.css')]    // 生产的文件名
    /*
    plugins:[new ExtractTextPlugin({filename:'style.css})]
    */
}
```
    tips:
        使用expract-text-webpack-plugin 打包分离css时会报错, 因为该插件目前不支持webpack4.0版本
        
    yarn add extract-text-webpack-plugin@next --save-dev
        
        
    自动处理CSS3属性前缀
        yarn add --save-dev autoprefixer postcss-loader
````js
// Usage

// postcss.config.js
{
    plugins:[
        require('autoprefixer')
    ]
}

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  }
}
````
[postcss-loader](https://github.com/postcss/postcss-loader)
        
    Babel是一个JavaScript编译器，主要用于在旧的浏览器或环境中将ECMAScript2015+代码转换为向后兼容版本的JavaScript
    版本的代码。
    
    对bebel的安装与配置:
        webpack 3.x babel-loader 7.x | babel 6.x
            yarn add --save-dev babel-loader babel-core babel-preset-es2015
            
        webpack 3.x | babel-loader 8.x | babel 7.x
            yarn add babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env 
    
```js
{
    test:/\.js$/,
    use:[
        {
            loader:'babel-loader',
            options:{
                presets:['es2015']
            }
        }
    ]
}
```
        
        
        
        
        
        
        
        
        
        
        
        
        

    
    
    
    
    
    