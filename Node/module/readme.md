
# Node.js模块系统

    为了让Node.js文件可以相互调用,Node.js提供了一个简单的模块系统。模块是Node.js应用程序的基本组成部分
    文件和模块是一一对应的。一个Node.js文件就是一个模块。
    
    Node.js提供了exports和require两个对象,exports是模块公开的接口,require用于从外部获取一个模块的接口。
    
```js
// hello.js文件
exports.world = function(){
    console.log("Hello World");
}

// main.js文件
const hello = require("./hello.js");
hello.world();
```
    tips:
    1. Node.js中每个模块都包含在一个立即执行的函数中,可以使用 arguments.callee验证,返回的函数有5个参数,分别是
		exports require module __filename __dirname
    2. module对象不是全局的,而是每个模块本地的。
    3. 在Node中,模块分为两类，一类是Node提供但模块，称为核心模块，另一类是用户编写但模块。称为文件模块。
    
## exports和module.exports使用

    如果要对外暴露属性或方法,用exports就行,要暴露对象就用module.exports
    
    tips:
    1. module.exports的赋值必须立即完成，不能在任何回调中完成。
    2. 不可以对exports直接赋值。
```js
// module.exports 大致实现思路。
var module = {
    id:'hello',
    exports:{}
}
var load = function (module){
    function greet(name){
        console.log('name');
    }
    module.exports = greet;
    return module.exports;
}
```
    默认情况下,Node准备的exports变量和module.exports变量实际上是同一个变量,并且初始化为控对象。
    给exports赋值是无效的,因为赋值后,module.exports仍然是空对象。

[node模块](https://www.liaoxuefeng.com/wiki/1022910821149312/1023027697415616)   

## 模块加载优先级

    Node.js中存在4类模块(原生模块和3中文件模块)。
    
    1. 从文件模块缓存中加载
        尽管原生模块与文件模块的优先级不同,但是都会优先从文件模块的缓存中加载已经存在的模块。
    2. 从原生模块加载
        原生模块的优先级仅次于文件模块缓存的优先级。require 方法在解析文件名之后，优先检查模块是否在
        原生模块列表中。以http模块为例，尽管在目录下存在一个 http/http.js/http.node/http.json 
        文件，require("http") 都不会从这些文件中加载，而是从原生模块中加载
        
    require()方法接收的集中参数
    1. http fs path等原生模块
    2. ./ 相对路径的文件模块
    3. 绝对路径的文件模块
    4. 非原生模块的文件模块
    
# path
    
    path模块提供了一些用于处理文件路径的小工具，可以通过require()引入该模块
    var path = require("path");
    
    
    __dirname   当前文件夹得绝对路径
    __filename   当前文件的绝对路径
    path.parse()    返回路径字符串对象
    path.extname()  返回路径文件的后缀名
    path.join()     连接路径
	
	path.basename()	返回当前的文件名
		也可以用 path.parse(__filename).base 返回当前文件名