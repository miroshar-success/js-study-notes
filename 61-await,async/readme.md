# async

	ES2017标准引入了async函数,使得异步操作变得更加方便。它是Generator函数的语法糖。
	
	1. async表示函数里有异步操作,await表示紧跟在后面的表达式需要等待结果。
	2. async函数的返回值是promise对象,可以用then方法指定下一步的操作。

## 基本用法

	async 函数返回一个Promise对象,可以使用then方法添加回调函数。当函数执行的时候,一旦遇到await就会先返回。
	等到异步操作完成,再接着执行函数提内后面的语句。
```js
// demo1
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}
asyncPrint('hello world', 50);



// demo2   async函数返回的是promise对象,可以作为await命令的参数。
async function time1(ms){
	await new Promise((resolve) => {
		setTimeout(resolve,ms);
	})
}
async function asyncTime1(value,ms){
	await time1(ms);
	console.log(value);
}
asyncTime1('hello China',3000);
```

## 返回Promise对象

	async函数返回一个Promise对象。
	1. async函数内部return语句返回的值,会成为then方法回调函数的参数。
```js
async function f(){
	return 'hello world';
}

f().then(v => {
	console.log(v);
})
```
	2. async函数内部抛出的错误,会导致返回的Promise对象变为reject状态。抛出的错误对象会被catch方法回调函数接受
```js
async function f2(){
	throw new Error('出错了');
}
f2().then(v=>{
	console.log(v);
})
.catch(err=>{
	console.log(err);	// 出错了
})
```

	Promise 对象的状态变化

	async函数返回的Promise对象,必须等到内部所有await命令后面的Promise对象执行完,才会发生状态的改变。
	只有async函数内部的异步操作执行完,才会执行then方法执行的回调函数。
	
 # await
 
```js
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
```
	
	2. await命令后面是一个thenable对象(即定义then方法的对象),那么await会将其等同于Promise对象。
```js
class Sleep{
	constructor(timeout){
		this.timeout = timeout;
	}
	then(resolve,reject){
		let start = Date.now();
		setTimeout(() => {
			resolve(Date.now() - start)
		},this.timeout)
	}
}

(async () => {
	const sleepTime = await new Sleep(1000);
	console.log(sleepTime);
})()
```

	await命令后面的Promise对象如果变为reject状态,则reject的参数会被catch方法的回调函数接受到。
```js
async function f(){
	await Promise.reject('出错了');
}

f().then(v => console.log(v))
.catch(err => console.log(err))
```

	任何一个await语句后面的Promise对象变为reject状态,那么整个async函数都会中断执行。
```js
async function m3(){
	await Promise.reject('出错');
	await Promise.resolve('hello 出错了吗');
}
```
	第二个await语句不会执行,因为第一个await语句状态变成了reject。
	
## 错误处理

```js
// 如果await后面的异步操作出错,那么等同于async函数返回的Promise 对象被reject.
async function f1(){
	await new Promise(function(resolve,reject){
		throw new Error('出错了');
	})
}
f1()
.then(v => {
	console.log(v);
})
.catch(err => {
	console.log(err);
})
```

	tips: 防止错误出现的方法, 将其放在try...catch代码块之中。
```js
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}
```
	tips:
	1. 如果有多个 await 命令,可以统一放在 try ... catch 结构中。
	2. 多个await命令后面的异步操作,如果不存在继发关系,最好让它们同时触发。
	3. await命令只能用在async函数之中,如果用在普通函数,就会报错。