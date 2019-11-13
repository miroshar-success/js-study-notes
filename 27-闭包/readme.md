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

	1. 在循环中创建闭包
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
	
	Demo from MDN
```html
<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>

<script>
	// 1
	function showHelp(help){
		document.getElementById('help').innerHTML = help
	}
	function setupHelp(){
		var helpText = [
			{'id':'emial','help':'Your e-mail address'},
			{'id':'name','help':'Your full name'},
			{'id':'age','help':'Your age(you must be over 16)'},
		]
		for(var i = 0; i < helpText.length; i++){
			var item = helpText[i];
			/*这三个闭包在循环中被创建,但他们共享了同一个词法作用域*/
			document.getElementById(item.id).onfocus = function(){
				showHelp(item.help)
			}
		}
	}
	setupHelp()
	
	// 2  另一种解决方法是使用匿名闭包
	
	
	
	/* 解决上面问题的一种方案是使用更多的闭包:*/
	function makeHelpCallback(help){
		return function(){
			showHelp(help);
		}
	}
	...
    for (var i = 0; i < helpText.length; i++) {
		var item = helpText[i];
		document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
    }
	...
</script>
````
	避免使用更多的闭包,可以使用let关键词，闭包在处理速度和内存消耗方面对脚本性能具有负面影响。
	
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
	
## 函数作为返回值
	
	高阶函数除了可以接受函数作为参数外,还可以把函数作为结果值返回。
```js
function lazy_sum(array){
	var sum = function(){
		return array.reduce((x,y) => {
			return x + y;
		})
	}
	return sum;
}
var f1 = lazy_sum([1,2,3,4,5]);
var f2 = lazy_sum([1,2,3,4,5]);
f1 === f2	// false
```
	在函数lazy_sum中定义了函数sum,内部函数sum可以引用外部函数lazy_sum的参数和局部变量,当lazy_sum返回函数sum时,
	相关参数和变量都保存在返回的函数中。每次调用lazy_sum()，每次调用都会返回一个新的函数。
	
## 闭包中的this

```js
// 1.
var name = 'The Window';
var obj = {
	name:'My Object',
	getName:function(){
		return function(){
			return this.name
		}
	}
}
obj.getName();	// The Window		实际是在全局作用域中调用了匿名函数,this指向了window, 匿名函数的执行环境具有全局性。

// 2 
var name = 'The Window';
var obj = {
	name:'My Object',
	getName:function(){
		var that = this;
		return function(){
			return that.name;
		}
	}
}
obj.getName();	// My Object
```

## 匿名函数与闭包
	
	匿名函数最大的用途是创建闭包,并且还可以构建命名空间,以减少全局变量的使用。减少全局变量的污染。
```js
var objEvent = objEvent || {};
(function(){
	var addEvent = function(){
		//
	}
	var removeEvent = function(){
		// 
	}
	objEvent.addEvent = addEvent;
	objEvent.removeEvent = removeEvent;
})();
```

![闭包-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
![闭包-seg](https://segmentfault.com/a/1190000006875662)