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
    [name]的意思 是根据入口文件的名称,打包成相同的名称文件
    
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
```js
// webpack.config.js
{
    plugins:[
        new htmlPlugin({
            minify:{removeAttributeQuotes:true},    // 去掉html里的双引号
            hash:true,  // 为了防止开发中js有缓存
            template:'./src/index.html' // 打包的html模版路径和文件名称
        })
    ]
}
```
    打包图片：
        npm install file-loader --save-dev
        
        npm install url-loader --save-dev
```js
// webpack.config.js;
// Usage


```
    
    
    
    
    
    
    
    