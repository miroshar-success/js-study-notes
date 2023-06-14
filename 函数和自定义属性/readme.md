# 函数
	
	function 函数，是一个可以被其他代码或其自身调用的代码片段，或者是一个指向该函数的变量。
	当函数被调用时，参数被作为输入传递给函数,并且函数可以返回输出。在JavaScript中，函数也是一个对象。
	
	在JavaScript中，函数是头等对象，因此它们可以像任何其他对象一样具有属性和方法。每个函数都是一个Function对象。
	
	tips:
	1. 如果一个函数中没有使用return语句,则它默认返回undefined。

```js
// 1. 匿名函数

function () {};
() => {};

// 2. 命名函数
function foo() {};
const foo = () => {};

// 3. 立即调用函数表达式
// 是一种被加载到浏览器的编译器之后直接调用的函数.识别IIFE的方法是通过在函数声明的末尾定位额外的左和右括号。
(function food(){
    console.log('Hello Food');
})()
```

	(function IIFE(){...}) 函数表达式外面的(...)就是JavaScript语法能否放置其成为普通函数声明的部分。
```js
foo1(); // foo1
foo2(); // foo2 is not defined
function foo1(){
	console.log('foo1');
}

(function foo2(){
	console.log('foo2')
})
```
  polyfill 用于表示根据新特性的定义,创建一段与之行为等价但能够在旧的JavaScript环境中运行的代码。
```js
// isNaN

if(!Number.isNaN){
	Number.isNaN = function(x){
		return x !== x;
	}
}
```

## 函数重载

  重载函数是函数的一种特殊情况，为方便使用，C++允许在同一范围中声明几个功能类似的同名函数，但是这些同名函数的形式参数
  （指参数的个数、类型或者顺序）必须不同，也就是说用同一个函数完成不同的功能。这就是重载函数。重载函数常用来实现功能类似而所处理的数
  据类型不同的问题。不能只有函数返回值类型不同。
  在JavaScript中 没有函数重载
	
## 函数属性和方法

	Function.name       // 函数名
	Function.length     // 函数参数个数
	tips:形参的数量不包括剩余参数个数,仅包括第一个具有默认值之前的参数个数。
```js
console.log((function () {}).length)  // 0
console.log( (function(a){}).length ) // 1
console.log( (function(a,b){}).length ) // 2
console.log( (function(...arg){}).length )  // 0
console.log( (function(a,b,c = 1){}).length ) // 2
console.log( (function(a,b = 1,c){}).length ) // 1
```
	Function.prototype.apply()
	Function.prototype.bind()
	Function.prototype.call()
	Function.prototype.toString()











