
# setTimeout()

	用于在指定的毫秒后调用函数或计算表达式。 使用clearTimeout()方法来阻止函数的执行。
	
	setTimeout(function/code, milliseconds, param1, param2, ...)
		function		必须.要调用一个代码串,也可以是一个函数
		milliseconds	可选,执行或调用code/function 需要等待的时间,以毫秒计,默认为0
		param1,param2	可选。传给执行函数的其他参数
		
	返回值:
		返回一个ID(数字),可以将这个ID传递给clearTimeout()来取消执行。
		
```js
// ajax封装   output

for(var i = 0; i < 5; i++){
	setTimeout(function(){
		console.log(i);
	},i*1000);
}

// 输出5 个 5
```
	for循环时setTimeout()不是立即执行的,它们的回调被push到了宏任务队列中,而在执行任务队列里的回调函数时,变量i已经变成了5。
	解决方法:
```js
// (1)   引入IIFE
for(var i = 0; i < 5; i++){
	(function(i){
		setTimeout(function(){
			console.log(i);
		},i*1000);
	})(i)
}


// (2)   使用ES6的let关键字
for(let i = 0; i < 5; i++){
   setTimeout(function() {
	   console.log(i);
   },i*1000);
}

// (3)  使用bind强制绑定  
for(var i = 0; i < 5; i++){
  setTimeout(function (i){
	  console.log(i);
  }.bind(null,i),i*1000);
}

// (4)  利用setTimeout的第三个参数
for(var i = 0; i < 5; i++){
  setTimeout(function(i) {
	  console.log(i);
  },i*1000,i);
}

// (5)	
var loop = function (i) {
	setTimeout(function timer() {
	  console.log(i);  
	}, i*1000);
};
for (var i = 0;i < 5; i++) {
	loop(i);
}
```
![彻底理解setTimeout](https://www.jianshu.com/p/3e482748369d?from=groupmessage)	
![Event Loop](https://github.com/aooy/blog/issues/5)
	
	
	tips
```js
function fn(a){
   console.log(a)
}
setTimeout(fn(10),2000)	// 这种写法立马输出10， fn(10) 是函数立即执行，和setTimeout没有关系


setTimeout(function fn(){
   console.log(10);
},2000)					// 2s后再输出10
```
		
# setInterval()

	该方法可按照指定的周期(以毫秒计)来调用函数或计算表达式。 setInterval()会不停地调用函数,直到clearInterval()被调用
	或者窗口被关闭。由setInterval()返回的ID值可用作clearInterval()方法的参数。
	
	setInterval(code/function,milleseconds,param1,param2);
		function		必须.要调用一个代码串,也可以是一个函数
			milliseconds	可选,执行或调用code/function 需要等待的时间,以毫秒计,默认为0
			param1,param2	可选。传给执行函数的其他参数
			
		返回值:
			返回一个ID(数字),可以将这个ID传递给clearTimeout(),clearInterval()来取消执行。

## demo

```js
setInterval(function(){
	console.log("setInterval");
},100);
  
function run(){
	setTimeout(function(){
		console.log("setTimeout");
		run();
	},100);
}
run();
```
	tips:
	1. setInterval保证 开始执行的时间间隔 > 100ms
	比如这个setInterval的例子，每间隔100ms执行一次，但fn本身执行需要150ms，导致在200ms时候第二个run函数加入到事件队列但是他需要等待
	第一个run函数在150ms执行完毕之后再执行，这就导致了这两个run函数“开始执行”的时间间隔是150ms，但是“两次run之间的间隔”是0ms.
	
	2. setTimeout保证 两次执行函数之间的间隔 > 100ms
			
# Event Loop

	所有任务可以分为两种,一种是同步任务(synchronous),另一种是异步任务(asynchronous)。同步任务指的是,在主线程上排队执行
	的任务,只有前一个任务执行完毕,才能执行后一个任务。异步任务指的是 不进入主线程,而进入"任务队列"的任务。
	只有任务队列通知主线程,某个异步任务可以执行了,该任务才会进入主线程执行。
	
	(1)	所有同步任务都在主线程上执行,形成一个执行栈
	(2)	主线程之外,还存在一个"任务队列"。只要异步任务有了运行结果,就在'任务队列'之中放置一个事件
	(3) 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，
	于是结束等待状态，进入执行栈，开始执行。
	(4)	主线程不断重复上面的第三部
	
	主线程从"任务队列"中读取事件,这个过程是循环不断的,所以整个的这种运行机制又称为 Event Loop(事件循环)。
	
	setTimeout()和 setInterval()只是将事件插入了"任务队列",必须等到当前代码(执行栈)执行完毕,主线程才会去执行它指定的
	回调函数。要是当前代码耗时很长,有可能要等很久,所以并没有办法保证,回调函数一定会在setTimeout()指定的时间执行。
	

# window.requestAnimationFrame()

	window.requestAnimationFrame(callback)
	
		callback: 下一次重绘之前更新动画帧所调用的函数。
	
	返回值:
		一个long整数,请求ID，是回调列表中唯一的标识。是个非零值,可以传这个值给window.cancelAnimationFrame()
		取消回调函数。
```js
const oBox = document.querySelector('.box');

// window.requestAnimationFrame()
function step(stamp){
	x+=10;
	oBox.style.left = x + 'px';
	let timer = window.requestAnimationFrame(step);
	if(x > 300){
		window.cancelAnimationFrame(timer);
	}
}


// setTimeout()
function run(){
	let timer = setTimeout(function(){
		leftX += 10;
		oBox2.style.left = leftX + 'px';
		run();
	},1000/60);
	if(leftX > 300){
		clearTimeout(timer);
	}
}
run();


// setInterval()
function move(){
	let timer = setInterval(function(){
		leftX += 10;
		oBox2.style.left = leftX + 'px';
		if(leftX > 300){
			clearInterval(timer);
		}
	},1000/60);
}
move();
```

	setTimeout() 是通过设置一个时间间隔来不断的改变图像的位置,从而达到动画效果。但利用setTimeout()实现的动画在某些低端机上会出现卡顿
	抖动的现象。
	1. setTimeout()执行的时间并不是确定的，在JavaScript中,setTimeout任务被放进了异步队列中,只有当主线程上的任务执行完以后，才会
	执行队列里的任务,所以setTimeout()的实际执行时机一般要比其设定的时间晚一些。
	2. 刷新频率受 屏幕分辨率 和屏幕尺寸的影响, 不同设备的屏幕绘制频率不同,而setTimeout()只能设置一个固定的时间间隔,这个时间不一定和屏幕的
	刷新时间相同。
	
	以上原因会导致动画出现丢帧的现象。
```js
window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame || 
		function(callback){
			window.setTimeout(callback,1000/60);
		}
})()
```