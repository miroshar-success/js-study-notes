/* async是  Generator函数的语法糖, 返回一个Promise对象,可以使用then方法添加回调函数 */
function timeout(ms){
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		},ms);
	})
}

async function asyncTimeout(ms) {
	await new Promise((resolve) => {
		setTimeout(resolve,ms);
	});
	console.log("我是async函数");
}

async function asyncPrint(value,ms) {
	await timeout(ms);
	await asyncTimeout(ms);
	console.log(value);
}

asyncPrint('hello world',1000);


function getData(){
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('jay')
		},1000);
	})
}
async function hello() {
	return await getData();
	console.log('等待async执行完');
}
async function hello1(){
	const data = await getData();
	return data;
}
hello().then(data => {
	console.log(data);
});
/*
async 函数返回一个Promise对象, 内部return 语句返回的值,会成为then方法回调函数的参数。
await前要加 return 才能得到返回值
*/
hello1().then(data => {
	console.log(data);
});

async function f(){
	let number = Math.random();
	if(number > 0.5) {
		return ('successful----' + number)
	}else{
		throw new Error('出错了');
	}
}
f().then(data => {
	console.log('resolve',data);
})
	.catch(err => {
		console.log('reject',err);
	})








