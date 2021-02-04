# 资源处理
	
	asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
	asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
	asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
	
	现在webpack将按照默认条件,自动在resource和inline之间进行选择,小于8kb的文件将会视为inline模块类型,否则被视为resource模块类型。
```js
// webpack.config.js
{
	rules:[
		{
			test:/\.(jpg|png|jpeg)$/,
			type:'asset/resource',
			generator:{
				filename:'static/[name].[ext]'	// 定义打包后文件输出目录和文件名
			},
			parser:{
				dataUrlCondition:{
					maxSize:4 * 1024	// 设置inline限定值
				}
			}
		}
	]
}
```
[url-loader](https://www.npmjs.com/package/url-loader)

# 管理输出
	
	npm install --save-dev html-webpack-plugin
		会创建一个html文件,所有打包的bundle会自动添加到html中
		
	清理 /dist文件夹
		npm install --save-dev clean-webpack-plugin
```js
// Usage	 webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
{
	plugins:[
		new HtmlWebpackPlugin({
			title:"管理输出"
		}),
		CleanWebpackPlugin()
	]
}
```
# 开发环境
```js
// webpack.config.js
{
	mode:"development",
	devtool:"inline-source-map"
}
```
	使用source maps,可以将编译后的代码映射回原始代码。
	
	开发工具，可以在代码发生改变后自动编译代码 而不用每次编译时都要手动运行 npm run build
		1. webpack's Watch Mode
		2. webpack-dev-server
		3. webpack-dev-middleware
```js
//package.json
"scripts":{
	"watch":"webpack --watch"
}
// webpack.config.js
//避免在watch触发增量构建后删除 HtmlWebpackPlugin 创建的index.html文件,可以在CleanWebpackPlugin中配置 
{
	plugins:[
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets:false
		})
	]
}
```
	npm run --save-dev webpack-dev-server
	提供一个简单的web server,并且具有live reloading(实时重新加载)功能。
```js
// webpack.config.js
{
	devServer:{
		contentBase:"./dist",
		port:9000
	}
}
// package.json
{
	"scripts":{
		"start":"webpack serve --open"
	}
}
```
	webpack-dev-middleware是一个封装器,它可以把webpack处理过的文件发送到一个server。
[使用express配合webpack-dev-middleware](https://webpack.docschina.org/guides/development/);

# 代码分离
	
	常用的代码分离方法有三种:
		1. 入口起点: 使用entry配置手动地分离代码
		2. 防止重复: 使用Entry dependencied或者SplitChunksPlugin去重和分离chunk
		3. 动态导入: 通过模块的内联函数调用来分离代码
	
	将第三方库提取到单独到vendor chunk中是比较推荐到做法。这是因为他们很少像本地的源代码那样频繁修改。因此可以利用client的长效缓存机制,命中
	缓存来消除请求。
	
[webpack官方文档5.0](https://webpack.docschina.org/guides/development/)