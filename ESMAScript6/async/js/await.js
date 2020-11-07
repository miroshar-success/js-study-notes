/* 正常情况下,await 命令后面是一个Promise对象,返回该对象的结果,如果不是Promise对象,就直接返回对应的值*/

async function f(){
	return await 123;
}
f().then(data => {
	console.log(data);	// 123
})

/*await后面是一个 定义了then方法的对象*/
class Sleep {
	constructor(timeout){
		this.timeout = timeout;
	}
	then(resolve){
		let startTime = Date.now();
		setTimeout(() => {
			resolve(Date.now() - startTime);
		},this.timeout);
	}
}
(async () => {
	let sleep = await new Sleep(1000);
	console.log(sleep);
})();

/* await返回 resolve结果时前必须要加return,返回错误时可以不用 */
async function foo(){
	await Promise.reject("我没有使用return");
	return await Promise.resolve('hello world');
}
foo().then(data => {
	console.log(data);
})
	.catch(err => {
		console.log(err);
	});



/*多个并列的await语句,如果前面的报错了则会中断函数执行*/
async function manyAwait() {
	let a = await Promise.reject("我是a,报错了");
	let b = await Promise.resolve("我是b,正常执行");	// 不会执行
	return {a,b};
}
manyAwait().then(data => {
	console.log(data);
}).catch(err => {
	console.log(err);
});


/*前面的报错不会中断后面的语句执行, 使用try...catch */
async function continueFunction1(){
	try {
		await Promise.reject("不会中止后面的语句");
	}	catch(e) {
		console.log(e);
	}
	return await Promise.resolve("我会继续执行");
}
continueFunction1().then(data => {
	console.log(data);
}).catch(e => {
	console.log(e);	// 这里不会捕获到里面的错误
});

/*报错时 使用.catch 捕获*/
async function continueFunction2(){
	await Promise.reject("不会中止后面的语句执行").catch(err => {
		console.log(err);
	});
	return await Promise.resolve('我会继续执行');
}
continueFunction2().then(data => {
	console.log(data);
}).catch(err => {
	console.log(err);
});


async function bar() {
	await new Promise((resolve,reject) => {
		reject("hello,我是一个bug");
	})
}
bar().then(v => console.log(v))
	.catch(e => console.log(e));

async function baz(){
	try {
		await new Promise((resolve,reject) => {
			reject("我是一个bug,但是不会被抛出")
		})
	}catch(e) {
		console.log(e)
	}
}
baz().then(v => console.log(v))
	.catch(e => console.log(e));


/* await 非继发关系 执行多个 异步操作*/
function f1(){
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('f1');
		},1000);
	})
}

function f2(){
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("f2");
		},1000);
	},1000)
}


/*继发执行f1和f2*/
async function m1(){
	const startTime = Date.now();
	let a = await f1();
	let b = await f2();
	console.log('time1:',Date.now() - startTime);
	return {a,b};
}
m1().then(data => {
	console.log(data);
})

/* 并发执行f1 和 f2 使用promise.all*/
async function m2(){
	const startTime = Date.now();
	let [a,b] = await Promise.all([f1(),f2()]);
	console.log('time2:',Date.now() - startTime);
	return {a,b};
}
m2().then(data => {
	console.log(data);
});

/*并发执行 f1和f2 第二种写法*/
async function m3(){
	const startTime = Date.now();
	let promiseA = f1();
	let promiseB = f2();
	let a = await promiseA;
	let b = await promiseB;
	console.log('time3:',Date.now() - startTime);
	return {a,b};
}
m3().then(data => console.log(data));


/* 循环执行一个同一个异步操作,继发执行,前一个请求执行成功执行后面的请求 */
function map1(data) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data);
		},1000);
	})
}
async function loginOrder(array){
	for(let v of array) {
		const response = await map1(v);
		console.log(response);
	}
}
loginOrder([1,2,3,4,5]);	// 间隔1s 输出 value;


/*循环并发执行*/
async function logOrder(array){
	let promises = array.map(async val => {
		return await map1(val);
	});
	for(text of promises){
		console.log(await text);
	}
}
logOrder([1,2,3,4,5])