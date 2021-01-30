const PI = 3.1415926;
console.log(PI);
// PI = 3;	// Assignment to constant variable.		声明后不能修改值

// const a;		const声明的变量必须初始化
// console.log(a);	// Missing initializer in const declaration


// 存在暂时性死区
if(true){
	const MAX = 5;
	console.log(MAX);
}
// const实际保存的不是变量的值不得改动,而是变量指向的那个内存地址不得改动。

const obj = {};

obj['firstname'] = 'kyrie';
obj['lastname'] = 'irving';

console.log(obj);	// 可以给obj添加属性,但是指向另一个对象就会报错

// obj = {}	// Assignment to constant variable


const player = Object.freeze({});
player['firstname'] = 'kyrie';
console.log('player',player);	// {}		常规模式下不起作用


const singer1 = {
	name:{
		firstname:'jay'
	}
}

singer1['name']['firstname'] = 'chou';
console.log(singer1);	// {name:{firstname:chou}}


let object = {
	1:'one',
	2:'two'
}

console.log( Object.keys(object), object );

function constantize(obj) {	// 将一个对象彻底冻结
	Object.freeze(obj) 
	Object.keys(obj).forEach((key,i) => {
		if(typeof obj[key] == 'object'){
			constantize(obj[key]);
		}
	})
}

let singer2 = {
	name:{
		firstname:'jay'
	}
}
constantize(singer2);

singer2['name']['firstname'] = 'chou';
console.log('singer2:',singer2);


