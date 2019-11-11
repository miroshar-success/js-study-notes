# 闭包
	
	1. 函数与对其状态即词法环境的引用共同构成闭包。也就是说闭包可以让你从内部函数访问外部函数作用域。
	2. 理解闭包，需要理解JavaScript特殊的变量作用域。 全局变量和局部变量，在函数内部，可以直接读取全局变量
	3. 闭包是指有权访问另一个函数作用域中的变量的函数,常见的创建闭包的方式就是在一个函数内部创建另一个函数。
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
	
## 词法作用域

```js
// 词法作用域
function init(){
	var name = 'mozilla';
	function displayName(){
		console.log(name);
	}
	displayName();
}
init()

// 词法作用域根据变量声明的位置来确定该变量可被访问的位置。嵌套函数可获取声明于外部作用域的函数
```

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
```

## 闭包

```js
function makeFunc(){
	var name = 'mozilla';
	function displayName(){
		console.log(name);
	}
	return displayName;
}

var myFunc = makeFunc();
myFunc();
```
	上述代码中,也许不能直观的看出这段代码能够正常运行。函数中的局部变量仅在函数的执行期间可用。一旦makeFunc()执行完毕，
	我们会认为name变量不能被访问。

```js
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
	
	2. 通常只使用一个方法的对象的地方，都可以使用闭包
```html
<style>
	body {
	  font-family: Helvetica, Arial, sans-serif;
	  font-size: 12px;
	}
	h1 {
	  font-size: 1.5em;
	}
	h2 {
	  font-size: 1.2em;
	}
</style>

<script>
	function makeSizer(size) {
	  return function() {
		document.body.style.fontSize = size + 'px';
	  };
	}
	var size12 = makeSizer(12);
	var size14 = makeSizer(14);
	var size16 = makeSizer(16);
</script>
```

	3. 可以使用闭包模拟私有方法。私有方法不仅仅有利于限制对代码的访问，还提供了管理全局命名空间的强大能力。
	避免非核心的方法弄乱了代码的公共接口部分。 模块模式
```js
var Counter = (function(){
	var privateCounter = 0;
	function changeBy(value){
		privateCounter += value;
	}
	return {
		increment:function(){
			changeBy(1);
		},
		decrement:function(){
			changeBy(-1);
		},
		value:function(){
			return privateCounter
		}
	}
})();
```
	上述案例中创建了一个词法环境,为三个函数所共享:Counter.increment,Counter.decrement,Counter.value.
	两个私有项：名为privateCounter的变量和名为changeBy的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数
	返回的三个公共函数访问。
	
```js
// 上述案例中我们立即执行了这个匿名函数,并将它的值赋值给了变量Counter,也可以把这个函数存储在另外一个变量中并用他来创建多个计数器
function makeCounter(){
	var privateCounter = 0;
	function changeBy(value){
		privateCounter += value;
	}
	return {
		increment:function(){
			changeBy(1)
		},
		decrement:function(){
			changeBy(-1)
		},
		value:function(){
			return privateCounter
		}
	}
}
var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```
	Counter1 和 Counter2 每个闭包都是引用自己词法作用域内的变量privateCounter。
	每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境。然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。
	
![闭包-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)