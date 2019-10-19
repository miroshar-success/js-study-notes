// 下面两个案例分别使用generator函数 和 async 读取文件
const fs = require('fs');

const readFile = function(fileName){
	return new Promise(function(resolve,reject){
		fs.readFile(fileName,(err,data)=>{
			if(err) {
				reject(err)
			}else{
				resolve(data);
			}
		})
	})
}

function* gen(){
	yield readFile('./poem1.txt');
	yield readFile('./poem2.txt');
}

let file = gen();
file.next().value.then(data=>{
	console.log(data.toString());
})
file.next().value.then(data=>{
	console.log(data.toString())
})

// 将上面的函数修改成使用async

async function generator(){
	const f1 = await readFile('./poem1.txt');
	const f2 = await readFile('./poem2.txt');
	console.log(f1.toString());
	console.log(f2.toString());
}

generator();