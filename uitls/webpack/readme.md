# webpack
	
	Install:
		npm install webpack webpack-cli(在命令行中运行webpack) --save-dev 
	webpack通过运行一个或多个npm scripts，会在本地node_modules目录中查找安装的webpack:
```js
"scripts": {
	"serve": "webpack serve --config webpack.dev.js",
	"build": "webpack --config webpack.prod.js",
	"start": "http-server dist"
}
```
	核心概念:
		入口(entry)/输出(output)/loader/插件(plugin)/模式(mode)/
		
```js
module.exports = {
	entry:{
		app:'./src/app.js'，		// 入口
		index:'./src/index.js'
	},
	output:{	
		filename:'[name].js',	// 多入口文件,应该使用占位符(substitutions)来确保每个文件具有唯一的名称。
		path:path.join(__dirname,'dist')
	}
}
```
	简单规则:
		每个HTML页面都有一个入口起点。单页应用(SPA):一个入口起点,多页应用(MPA):多个入口起点。动态加载都模块不是入口起点。
		默认情况下,每个入口chunk保存了全部其用都模块。


	webpack插件是一个具有apply方法的JavaScript对象。apply方法会被webpack compiler调用,并且在整个编译生命周期都可以访问compiler
	对象。
	new webpack.ProgressPlugin()	可以查看webpack编译进度。
	
	webpack能解析三种文件路径:
		绝对路径/相对路径/模块路径

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

	DefinePlugin
		允许在编译时创建配置的全局常量,需要区分 开发模式和生产模式进行不同的操作时非常有用。传递给DefinePlugin的每个键都是一个标识
		符或多个以. 连接的标识符号。
```js
module.exports = {
	plugins:[
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify('production')
		})
	]
}
```
	process对象提供一个全局变量,提供了有关当前Node.js进程的信息并对其进行控制。作为全局变量,它始终可供Node.js应用程序使用,无需使用require。
	process.env属性会返回包含用户环境的对象。在process.env上为属性赋值会隐式地将值转换为字符串。
	tips:
		在为 process 定义值时，'process.env.NODE_ENV': JSON.stringify('production') 会比
		process: { env: { NODE_ENV: JSON.stringify('production') } } 更好


	babel-loader
	此package允许你使用Babel和webpack转译JavaScript文件。
	npm install --save-dev babel-loader @babel/core @babel/preset-env
	
	Babel在每个文件都插入了辅助代码,对一些公用方法使用了非常小对辅助代码,比如_extend。默认情况下会被添加到每个需要它到文件中。可以引入
	Babel runtime作为一个独立模块,来避免重复引入。
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

# splitChunksPlugin

	当wbepack处理文件路径时,它们始终包含Unix系统中当/和Windows系统中的\。

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
		contentBase:"./dist",	// 告诉服务器内容的来源。 devServer.publicPath将用于确定bundle的来源,并具有优先级高于contentBase.
		compress:true,		// 为每个静态文件开启gzip compression
		port:9000,
		host:"0.0.0.0",
		hot:true,						// 热更新，启用webpack的 Hot Module Replacement功能
		open:true,					// 编译完成后自动打开html页面
		headers:"",					// 为每个请求添加响应标头
		historyApiFallback:true,	// 当使用HTML5 historyapi时,所有的404请求都会响应index.html的内容。
		before:function(app){
			app.get("/api/path",function(req,res){
				res.json({
					data,
					code:0
				})
			})
		}，
		overlay:{	// 编译出现错误和警告时在浏览器中全面覆盖显示
			warnings:true,
			errors:true	
		}，
		proxy:{
			"/api":{
				target:"http://localhost:3000"
			}
		},
		publicPath:'http://localhost:8080/assets/'	// 确保devServer.publicPath始终以/开头和结尾,
		// 建议devServer.publicPath 与 output.publicPath相同。
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
	devServer.proxy
		当拥有单独的API后端开发服务器并且希望在同一域上发送API请求时。可以使用proxy选项。
```js
module.exports = {
	devServer:{
		proxy:{
			'/api':{
				target:"http://localhost:3000",
				pathRewrite:{
					"^/api":""
				}
			}
		}
	}
}
```
	现在对 /api/users的请求将请求代理到 http://localhost:3000/api/users。 如果不希望传递/api,则需要重写路径.

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
	
	[hash] [chunkhash]和[contenthash]的长度可以使用[hash:16]来指定。
	
	ECMAScript模块
		默认情况下,webpack将自动检测文件是ESM还是其他模块系统。 Node.js通过设置 package.json中的属性来显示设置文件模块类型.
		在package.json中设置 type:"module"会强制package.json下的所有文件使用ECMAScript模块。
		设置 "type":"commonjs" 会强制使用CommonJS模块。
		
# resolve

	alias	创建import或require别名,来确保模块引入变得更简单,也可以在给定的键后的末尾添加$,以表示精确匹配；
```js
module.exports = {
	resolve:{
		alias:{
			xyz$:path.join(__dirname,'path/to/file.js')
		},
		extensions:['.js','.json'],	// 用户在引入文件时可以不携带扩展名
		mainFiles:['index']，	// 解析目录时要使用的文件名
		modules:[path.resolve(__dirname,'src'),'node_modules']	
		// 添加一个目录到模块搜索目录,此目录应优先于node_modules/搜索,使用绝对路径,将只在给定目录中搜索。
	}
}
```
# optimization

	优化
	
# Service Worker

	搭建一个检疫server,测试离线体验。 
		npm install http-server --save-dev
		npm install workbox-webpack-plugin
	
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
		开发环境启用HMR(hot module replacement)
```js
// webpack.config.js 
module.exports = {
	module:{
		rules:[
			{
				test:/\.js$/,
				include:path.resolve(__dirname,'src'),
				loader:'babel-loader'
			}
		]
	},
	devServer:{
		hot:true
	}
}
```
	
[webpack官方文档5.0](https://webpack.docschina.org/guides/development/)