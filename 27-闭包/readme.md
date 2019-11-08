# 闭包
	
	函数与对其状态即词法环境的引用共同构成闭包。也就是说闭包可以让你从内部函数访问外部函数作用域。
	理解闭包，需要理解JavaScript特殊的变量作用域。 全局变量和局部变量 
	
	在函数内部，可以直接读取全局变量
```js
var a = 999;
function f1(){
	console.log(a);
}
f1();	// 999



在另一方面,函数外部无法读取函数内部的局部变量。
function f1(){
	var a = 999;
}
console.log(a)	// a is not defined
```
	tips: 在函数内部声明变量的时候,一定要使用var,如果不用的话实际上是声明了一个全局变量！
	
	
## 获取函数内部的变量

```js
function f1(){
	var a = 999;
	function f2(){
		console.log(a);
	}
}

/*
上述函数中,f2被包裹在f1函数的内部,f1内部的所有变量,对f2都是可见的。子对象会一级一级地向上寻找所有父对象的变量
既然函数f2可以读取函数f1的内部变量,将函数f2作为返回值,就可以在f1外部读取到内部变量了
*/ 

function m1(){
	let a = 1;
	return function m2(){
		a++;
		console.log(a);
	}
}
const result = m1();
result()	// 2
```

	变量a的值始终保存在内存中没有清除，参见下方代码
```js
function f1(){
	var n = 999;
	add = function(){
		n+=1;
	}
	return function f2(){
		console.log(n);
	}
}
const result = f1();
result();	// 999
add();
result();	// 1000
```
	上述例子证明变量n一直保存在内存中,并没有在函数调用后被自动清除。 因为f2被赋给了一个全局变量,导致f2始终在内存中。
	而f2的存在依赖于f1，因此f1也始终在内存中。
	
	
## 闭包的应用

	1. for循环之中
```js
for(var i = 0; i < ali.length; i++){
   (function(i){
	   ali[i].onclick = function(){
		 console.log(i)
	   }
   })(i)
}

for(var i = 0; i < 5; i++){
   (function(i){
	   setTimeout(function(){
			console.log(i);
	   },1000*i);
   })(i)
}
```

