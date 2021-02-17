# Vue-loader

```js
// webpack.config.js
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:"vue-loader"
			}
		]
	},
	plugins:[
		new VueLoaderPlugin()
	]
}
```
	VueLoaderPlugin插件的职责是将定义过的其他规则复制并应用到.vue文件里相应语言的块。
	
# 资源处理	
	
	当Vue Loader编译单文件组件中的<template>块时,它会将所有遇到的资源URL转换为webpack模块请求:
```html
<img src="../image.png">

// 将会编译成为:
createElement('img',{
	attrs:{
		src:require("../image.png")
	}
})
```
	tips:	所有vue-cli创建的项目都默认配置了将@指向/src。
	1. 报错信息： 在.vue文件中使用img图片 引入资源 图片路径是 <bbject Module>，因为url-loader默认使用es6模块化解析,而html-loader引入图片
	是commonjs
```js
// webpack.config.js
{
	test:/\.(png|jpg|jpeg)$/,
	use:[
		{
			loader:'url-loader',
			options:{
				esModule:false	// 关闭url-loader的es6模块化,使用commonjs解析
			}
		}
	]
}
```

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

	vue-style-loader
		This is a fork based on style-loader.Similar to style-loader,you can chain it after css-loader to dynamically
		inject CSS into the document as style tags。

# 预处理器

	会根据lang特性以及webpack配置中的规则自动推断出要使用的loader。
	npm install -D sass-loader node-sass
```js
// webpack.config.js
module.exports = {
	module:{
		rules:[
			{
				test:/\.scss$/,	// 普通的.scss文件和 .vue文件中 <style lang="scss">块都应用它
<!-- 				use:[
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				] -->
				use:[	
					'vue-style-loader',
					'css-loader',
					{
						loader:'sass-loader',	// 允许所有被处理都文件之间共享常见都变量,而不需要显示地导入它们
						additionalData:`$color:red;`
					}
				]
			}
		]
	}
}
// 除了能够import 'style.scss', 还可以在Vue组件中使用SCSS;
```
	混用本地和全局样式(可以在一个组件中同时使用有scoped和非scoped样式)
	<style></style>
	<style scoped></style>
	
	自组件都根结点会同时受其父组件的scoped CSS 和 子组件的 scoped CSS的影响.这么设计是为了让父组件可以从布局的角度出发,调整其
	子组件根元素的样式。
```scss
<style lang="scss" scoped>
.a >>> .b {}

.a::v-deep .b{}
</style>
```
	
	postcss-loader
	npm install --save-dev postcss-loader postcss
```js
// webpack.config.js
module.exports = {
	module:{
		rules: [
			{
				test:/\.css$/i,
				use:['style-loader','css-loader','postcss-loader']
			}
		]
	}
}

// postcss.config.js
module.exports = {
	plugins: [
		[
			'postcss-preset-env'
		]
	]
}
```
	CSS分离
	npm install mini-css-extract-plugin -D
```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					process.env.NODE_ENV !== 'production'
					? 'vue-style-loader'
					:MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename:'style.css'
		})
	]
}
```
[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

	babel-loader
	npm install --save-dev babel-loader @babel/core
```js
// webpack.config.js
module:{
	rules:[
		{
			test:/\.js$/,
			exclude:/node_modules/,	// 
			loader:'babel-loader'
		}
	]
}
```
	npm install @babel/preset-env --save-dev
```js
// .babelrc
{
	"presets":['@babel/preset-env']
}
```
[babel-loader](https://babel.docschina.org/setup/#installation)

# 开发服务器

	webpack-dev-server可用于快速开发应用程序。
```js
// webpack.config.js
module.exports = {
	devServer:{
		contentBase:path.join(__dirname,'dist'),	// 静态文件内容的来源。
		compress:true,	// 利用gzips压缩 dist/目录当中的所有内容并提供一个本地服务。为每个静态文件开启 gzip compression
		port:9000，
		historyApiFallback:true,	// 当使用HTML5 history API时,所有的404请求都会响应index.html的内容。
		before:function(app,server,compiler){
			// 提供一个在devServer内部的所有中间件执行之前的自定义执行函数
		}
	}
}
```

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
		port:9000,
		host:"0.0.0.0",
		hot:true,						// 热更新
		open:true,					// 编译完成后自动打开html页面
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

# cross-env

	Most Windows command prompts will choke when you ser environment variables with NODE_ENV=production like that.
	cross-env makes it so you can have a single command without worrying about setting or using the environment
	properly for the platform.
	
	Installation:
		npm install --save-dev cross-env
```js
// webpack.config.js
{
	"scripts":{
		"build":"cross-env NODE_ENV=production webpack --config webpack.config.js",
		"dev":"cross-env NODE_ENV=development webpack serve"
	}
}
```
# postcss-loader
	
	npm install postcss-loader postcss
```js
// Usage postcss.config.js
module.exports = {
	plugins:[
		[
			"postcss-preset-env"
		]
	]
}
// webpack.config.js
{
	rules:[
		{
			test:/\.css/,
			use:['style-loader','css-loader','postcss-loader']
		}
	]
}
```
	在css-loader和style-loader之前使用它,但是在其他预处理器(sass|less|stylus-loader)之后使用,(因为webpack loader从右到做/
	从底到顶执行)
	
# babel-loader

	npm install babel-loader @babel/core @babel/preset-env
```js
// webpack.config.js
{
	rules:[
		{
			test:/\.js$/,
			exclude:/node_modules/,
			use:[
				{
					loader:"babel-loader",
				}
			]
		}
	]
}
// .babelrc
{
	"presets":['@babel/preset-env']
}
```

# 代码分离
	
	常用的代码分离方法有三种:
		1. 入口起点: 使用entry配置手动地分离代码
		2. 防止重复: 使用Entry dependencied或者SplitChunksPlugin去重和分离chunk
		3. 动态导入: 通过模块的内联函数调用来分离代码
	
	将第三方库提取到单独到vendor chunk中是比较推荐到做法。这是因为他们很少像本地的源代码那样频繁修改。因此可以利用client的长效缓存机制,命中
	缓存来消除请求。
	
[webpack官方文档5.0](https://webpack.docschina.org/guides/development/)