# async/defer/module

	默认情况下，浏览器是同步加载JavaScript脚本,即渲染引擎遇到<script>标签会停下来，等到执行完脚本
	在向下渲染。如果是外部脚本，还必须加入脚本的下载时间
	
	允许异步加载js的语法
	<script src="./foo.js" defer></script>
	<script src="./foo.js" async></script>
	
![async/defer]("")
	
	defer:整个页面正常渲染结束后才会执行,如果有多个defer,会按照在页面出现的顺序加载
	async:一旦下载完，先执行脚本再继续渲染，多个async不能保证加载顺序的
	module:浏览器加载ES6模块，需要加入 type="module"属性,带有 type="module"的<script>,都是异步加载
	等到整个页面渲染完成，再执行模块脚本。

# Module
	
	ES6之前，最主要的模块加载方案,主要的有CommonJS和AMD两种，CommonJS用于服务器，AMD用于浏览器
	tips:
	1. CommonJS和AMD模块都只能在运行时确定这些东西。而ES6模块的设计是尽量的静态化，使得编译时就能确定模块的依赖关系。
	2. CommonJS模块就是对象，输入时必须查找对象属性。(运行时加载)
	3. ES6模块不是对象，通过export命令显示指定输出的代码，再通过import命令输入
	4. ES6模块自动采用严格模式,不管有没有在模块头部加上'use strict'
	5. 在模块顶层使用this关键字返回undefined,而不是指向window。

## ES6模块与CommonJS模块差异

	1. CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值得引用。
		一旦输出一个值,模块内部得变化就影响不到这个值。
	2. CommonJS模块是运行时加载,ES6模块是编译时输出接口。
		ES6模块是动态引用,不会缓存值,模块里面的变量绑定其所在的模块
		
## export命令

	模块功能主要由两个命令构成:export和import。export命令用于规定模块的对外接口,import命令用于输入其他模块提供的
	功能。
	
	tips:
	1. export语句输出的接口，与其对应的值是动态绑定关系
```js
export var foo = "bar";
setTimeout( () => foo = "bar",500);
```
	2. export可以出现在模块的任何位置,只要处于模块顶层就可以。处于块级作用域就会报错

## import命令

	使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块
	
	import {firstName,lastName,year} from "./profile.js";
	
	tips:
	1. import命令输入的变量都是只读的，因为它的本质是输入接口，不允许在加载模块的脚本里面改写接口。
	2. import命令具有提升效果，会提升到整个模块的头部，首先执行。
	3. 多次重复执行同一个import语句，那么只会执行一次，而不会执行多次。

## 模块的整体加载

	除了指定加载某个输出值,还可以使用整体加载，即用星号(*)指定一个对象，所有输出值都加载在这个对象上面。
```js
<!-- circle.js -->
export function area(radius){
	return Math.PI * radius * radius;
}
export function circumference(radius){
	return 2 * Math.PI * radius;
}

// 正常加载模块
import {area,circumference} from "./circle.js"
area(4);
circumference(4);

// 整体加载
import * as circle from "./circle.js"
circle.area(4);
circle.circumference(4);
```
	tips: 模块整体加载的对象是可以静态分析的，不允许运行时改变。
	
## export default
	
	export default命令，为模块指定默认输出。
	
	tips:
	1. export default命令用于指定模块的默认输出,该命令只能使用一次,import后不用加大括号
	2. export指定的输出，import引入时需要加大括号。
	3. export default命令其实是输出一个叫做default的变量
	