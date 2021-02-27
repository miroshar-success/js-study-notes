# webpack
	
	Install:
		npm install webpack webpack-cli(在命令行中运行webpack) --save-dev 
	webpack通过运行一个或多个npm scripts，会在本地node_modules目录中查找安装的webpack:
```js
"scripts":{
	"start":"webpack --config webpack.config.js"
}
```

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
	asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现,默认使用Base64算法编码的文件内容。
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

	style-loader
		It is recommended to combine style-loader with the css-loader 
	options:
		injectType:
			styleTag: Automatically injects styles into the DOM using multiple <style></style>.It is default behavior.
			singletonStyleTag:Automatically injects styles into the DOM using one <style></style>
			lazyStyleTag:injects styles into the DOM using multiple <style></style> on demand. We recommend following 
			.lazy.css naming convention for lazy styles and the .css for basic style-loader usage.
		esModule:
			By default,style-loader generates JS modules that use the ES modules syntax.
		source maps:
			The loader automatically inject source maps when previous loader emit them.Therefore,to generate source maps, set 
			the sourceMap option to true for the previous loader.
		
```js
// main.js
import styles from './style.css';
styles.use();

// webpack.config.js
{
	rules:[
		{
			test:/\.css$/,
			use:[
				{
					loader:'style-loader',
					options:{
						injectType:'lazyStyleTag'
					}
				},
				'css-loader'
			]
		}
	]
}
```
	vue-style-loader
		This is a fork based on style-loader.Similar to style-loader,you can chain it after css-loader to dynamically
		inject CSS into the document as style tags。
		
	css-loader
		options:
			importLoaders: Number default 0
		The option importLoaders allows you to configure how many loaders before css-loader should be applied to
		@import ed resources
```js
// webpack.config.js
module.exports = {
	module:{
		rules:[
			test:/\.css$/,
			use:[
				'style-loader',
				{
					loader:'css-loader',
					options:{
						importLoaders:2
						// 0	no loaders	1 postcss-loader 2 postcss-loader,sass-loader
					},
					'postcss-loader',
					'sass-loader'
				}
			]
		]
	}
}
```
	
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
	This plugin extracts CSS into separate files.It creates a CSS file per JS file which contains CSS.
	
	mini-css-extract-plugin is more often used in production mode to get separate css files.For development mode(including webpack-dev-server)
	you can use style-loader,because it injects CSS into the DOM using multiple <style></style> and works faster.
	
	Install:
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
			filename:'style.css',	// '[name].css'	,
			chunkFilename:'[id].css',	// base on filename
			ignoreOrder:false,	// Enable to remove warnings about conflicting order
		})
	]
}
```
[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)


	babel-loader
	npm install --save-dev babel-loader @babel/core @babel/preset-env
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

# HtmlWebpackPlugin	
	
	The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
	Just add the plugin to you webpack config
	
	npm install html-webpack-plugin --save-dev
```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	plugins:[
		new HtmlWebpackPlugin({
			title:String,//		the title to use for the generated hTML document
			filename:String,	// The file to write the HTML to .defaults to index.html.
			inject:'head|body|true|false',
			publicPath:String,	// The publicPath used for scripts and link tags
			minify:Boolean,		// true if mode is 'production', otherwise false
			hash:Boolean, // append a unique webpack compilation hash to all included scripts and css files.
			// This is useful for cache busting
			template:String, // if the default generated HTML doesn't meet your needs you can supply your own template.
			// The easiest way is to use the template option and pass a custom HTML file.
		})
	]
}
// <title><%= htmlWebpackPlugin.options.title %></title>
```

# tree shaking

	tree shaking是一个术语,通常用于描述移除JavaScript上下文中的未引用代码。(dead-code) 它依赖于ES2015模块系统中的静态结构特性。
	例如import和export。
	
	uglifyjs-webpack-plugin
	This plugin uses uglify-js to minify your JavaScript.
```js
// webpack.config.js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
	optimization:{
		minimizer:[new UglifyJsPlugin({
			test:/\.js$/i,
			include:	,// Files to include
			 exclude:,	// Files to exclude
			 sourceMap:true
		})]
	}
}
```
	tips: 避免在生产中使用inline-** 和 eval-**,因为他们可以增加bundle大小并降低整体性能。

# 生产环境构建
	
	开发环境和生产环境的构建目标差异很大。开发环境中需要有强大的 具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的
	source map和localhost server。生产环境下则关注更小的bundle,以改善加载时间。
	工具: webpack-merge
	npm install --save-dev webpack-merge
	
	bundle文件名: [contenthash]将根据资源内容创建出唯一hash。当资源内容发生变化时,[contenthash]也会发生变化。
	
	将第三方库提取到单独到vendor chunk文件中是比较推荐到做法,因为 他们很少像本地到源代码那样频繁到修改。利用client的长效缓存机制,命中
	缓存来消除请求,并减少像server获取资源,同时还能保证client代码和server代码版本一致。
	
# bundle分析

	webpack-bundle-analyzer
		npm install --save-dev webpack-bundle-analyzer
```js
// webpack.config.js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
	plugins:[
		new BundleAnalyzerPlugin()
	]
}
```
[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
[hash,chunkhash,contenthash区别](https://blog.csdn.net/bubbling_coding/article/details/81561362)

# 代码分离
	
	常用的代码分离方法有三种:
		1. 入口起点: 使用entry配置手动地分离代码
			tips: 如果入口chunks之间包含重复的模块,重复模块会被引入到各个bundle中。
		2. 防止重复: 使用Entry dependencied或者SplitChunksPlugin去重和分离chunk
		3. 动态导入: 通过模块的内联函数调用来分离代码
	
	将第三方库提取到单独到vendor chunk中是比较推荐到做法。这是因为他们很少像本地的源代码那样频繁修改。因此可以利用client的长效缓存机制,命中
	缓存来消除请求。
	
	构建性能:
		loader: 将loader应用于最少数量的必要模块,通过使用include字段
```js
// webpack.config.js 
module.exports = {
	rules:[
		{
			test:/\.js$/,
			include:path.resolve(__dirname,'src'),
			loader:'babel-loader'
		}
	]
}
```
	
[webpack官方文档5.0](https://webpack.docschina.org/guides/development/)