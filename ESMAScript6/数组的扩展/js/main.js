// 扩展运算符,将一个数组转为用逗号分隔的参数需列
console.log(...[1,2,3]);
console.log(...document.querySelectorAll("div"));

/*
1. 扩展运算符只有在函数调用时,才能放在圆括号中
2. 可以求一个数组的最大元素,而不需要使用apply或call
*/
console.log( Math.max.apply(null,[2,3,5,9]) )	// 9
console.log(Math.max.call(null,...[2,3,5,9]) )	// 9
console.log(Math.min(...[2,3,5,9]))	// 2

// 将一个数组从大到小排序
function getSort(array){
	let temp = [];
	// 先求出数组的最大值,将最大值添加进数组
	while(array.length > 0){
		let max = Math.max.apply(null,array);
		temp.push(max);
		let index = array.findIndex(item => item === max);
		array.splice(index,1);
	}
	return temp
}
console.log( getSort([3,7,2,1,9,8]) );


// 将一个数组添加进另一个数组的尾部,使用push方法
const arr1 = [0,1,2]
const arr2 = [3,4,5]
// ES6的写法
arr1.push(...arr2)
// ES5的写法,利用apply传入多个参数 需要传递一个数组
Array.prototype.push.apply(arr1,arr2);
console.log(arr1);


/*
扩展运算符的应用
*/
// 一 :  复制数组,ES5 可以借助concat方法 或 slice方法
const a1 = [1,2];
const a2 = a1.concat();
a2[0]= 2;
console.log(a1,a2);	// [1,2]	[2,2]

const b1 = [1,2,3];
const b2 = b1.slice(0);
b2[0] = 3;
console.log(b1,b2);	// [1,2,3]  [3,2,3]

const c1 = [4,5,6];
const c2 = [...c1];
c2[0] = 7;
console.log(c1,c2);	// [4,5,6] [7,5,6]

// 合并数组,这两种方法都是浅拷贝,如果子元素是对象,则还是对原对象的引用.
const array1 = ["a","b"];
const array2 = ["c"];
const array3 = ["d","e"];
console.log( array1.concat(array2,array3) );
console.log([...array1,...array2,...array3])

const ar1 = [{foo:1}];
const ar2 = [{bar:2}];
const ar3 = ar1.concat(ar2);
const ar4 = [...ar1,...ar2];
console.log(ar3,ar4,ar3[0]===ar1[0],ar4[0]===ar1[0]);	// true true

// 扩展运算符也可以将字符串转为真正的数组
console.log( [..."hello"] );	// ["h","e","l","l","o"]

// 实现了 Iterator接口的对象,任何定义了遍历器接口的对象,都可以用扩展运算符转为真正的数组
let nodeList = document.querySelectorAll("div");
console.log([...nodeList]);


// Array.from()  方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象
/*
实际应用中常见的类似数组的对象是DOM返回的NodeList集合,以及函数内部的arguments对象。
*/
let arrayLike = {
	0:"a",
	1:"b",
	2:"c",
	length:3
}
Array.from(arrayLike)	// ["a","b","c"]
Array.prototype.slice.call(arrayLike,0) // ["a","b","c"]
Array.from("hello");	// ["h","e","l","l","o"]

// tips 扩展运算符也可以将某些数据结构转为数组,
function foo(a,b,c){
	const arg = [...arguments];
	console.log(arg);
}
foo(1,2,3);

function bar(...values){
	console.log(values);
}
bar(1,2,3);

// 扩展运算符背后调用的是遍历器接口(Symbol.iterator),如果一个对象没有部署这个接口,就无法转换.
//[...arrayLike];	// 报错,

let arrLike1 = {
	firstName:"kyrie",
	lastName:"irving",
	age:27,
	length:3
}
let arrLike2 = {
	0:"kyrie",
	1:"irving",
	2:27,
	length:3
}
console.log( Array.from(arrLike1) );	//[undefined,undefined,undefined]
console.log( Array.from(arrLike2));	// ["kyrie","irving",27]


/*
Array.from() 还可以接受第二个参数,作用类似于数组的map方法,用来对每个元素进行处理,所以Array.from 除了将各种值转为
真正的数组,还提供map功能。
*/
console.log( Array.from([1,2,3],(x)=>Math.pow(x,2)) );

// 取出list列表里 li元素的内容
let oList = document.querySelectorAll(".playlist>li");
let textContent = Array.from(oList,(ele)=>ele.textContent);
console.log(textContent);	//  ["kyrie", "lebron", "durant"]
// 扩展运算符
console.log([...oList].map((item)=>item.textContent));
// ES5
console.log( Array.prototype.map.call(oList,(item)=>item.textContent) );


/*
Array.of() 用以将一组数值,转换为数组. 这个方法主要目的是弥补构造函数Array()的不足.
当只有一个参数时,返回的是数组的长度，而Array.of()总是返回参数值组成的数组。
*/
console.log(Array(),Array(3),Array(3,5,8));	// [] [empty*3] [3,5,8]

function myArrayOf1(){
	return Array.prototype.slice.call(arguments);
}
function myArrayOf2(){
	return [...arguments]
}
console.log(myArrayOf1(5),myArrayOf2(3,5))
console.log(myArrayOf2(3),myArrayOf2(3,5))


/*
find() 和 findIndex() 方法,
find()找出第一个符合条件的数组成员。没有找到则返回Undefined
findIndex() 返回第一个符合条件的数组成员的位置,没有找到则返回-1
*/
console.log( [1,4,-5,10].find((n)=> n > 3) );	//4
[1,5,10,15].find(function(value,index,arr){
	console.log(value,index,arr);
	return value > 5;
})

let index = [1,5,10,15].findIndex(function(value,index,arr){
	console.log(value,index,arr);
	return value > 9;
});
console.log(index);	// 2

let num = [1,5,10,15].findIndex(item=>item>100);
console.log(num)	// -1

/*
这两个方法都可以接受第二个参数，用来绑定回调函数的 this 对象
*/
let age = [10,12,26,15].find(function(v){
	return v > this.age;	// 回调函数的this值指向person对象
},{name:"John",age:10});
console.log(age);	// 12

/*
find() 和 findIndex() 方法 可以弥补indexOf()方法的不足,可以找出NaN,因为findIndex() 传递的是一个回调函数,可以借助
Object.is()方法判断
*/
console.log( [NaN].indexOf(NaN) );	// -1
console.log( [0,null,NaN].findIndex((item)=>Object.is(item,NaN)) );	// 2


// 数组实例的 entries() keys() 和 values()方法,用于遍历数组,它们都返回一个遍历器对象,可以用for...of循环进行遍历
for(let ele of ["a","b"].values()){
	console.log(ele);
}

// includes()方法用于判断数组是否包含给定的值,存在则返回true,否则返回false,可以判断NaN
console.log( [1,2,3].includes(2) );		// true
console.log( [1,2,3].includes(NaN) );	// false
console.log( [1,2,NaN].includes(NaN) );	// true


let a = [];
let b = {};
let c = 123;
let d = '123';
let e = undefined;
let f = null;
let g = NaN;
console.log( ({}).toString() ); // [object Object]
console.log( ({}).toString.call(a) );   // [object Array]
console.log( ({}).toString.call(b) );   // [object Object]
console.log( ({}).toString.call(c) );   // [object Number]
console.log( ({}).toString.call(d) );   // [object String]
console.log( ({}).toString.call(e) );   // [object Undefined]
console.log( ({}).toString.call(f) );   // [object Null]
console.log( ({}).toString.call(g) );   // [object Number]

// 深拷贝
function deepCopy(obj){
	let str = ({}).toString.call(obj);
	let type = str.slice(8,str.length-1).toLowerCase();
	if(type == 'array'){
		let newObj = [];
		for(let key in obj){
			if( typeof obj[key] != 'object' ){
				newObj[key] = obj[key];
			}else{
				newObj[key] = deepCopy(obj[key]);
			}
		}
		return newObj;
	};
	if(type == 'object'){
		let newObj = {};
		for(let key in obj){
			if( typeof obj[key] != 'object' ){
				newObj[key] = obj[key];
			}else{
				newObj[key] = deepCopy(obj[key]);
			}
		}
		return newObj;
	};
};
let arr1 = [1,2,3];
let arr2 = deepCopy(arr1);
arr1[1]= 5;
console.log(arr1,arr2);

let array1 = [1,{a:1},2,{d:4}];
let array2 = deepCopy(array1);
array2[1].a = 'kyrie';
console.log(array1);
console.log(array2);

let obj1 = {
	a:1,
	b:{
		c:1,
		d:2
	}
}
let obj2 = deepCopy(obj1);
obj1.b.c = 'james';
console.log(obj1);
console.log(obj2);

// 假定传入的是对象,不是数组
function deepRepeat(obj){
	let newObj = {};
	for(let key in obj){
		if(typeof obj[key] != 'object'){
			newObj[key] = obj[key];
		}else{
			newObj[key] = deepRepeat(obj[key]);
		}
	}
	return newObj;
}
let object1 = {
	name:{
		firstName:'kyrie',
		lastName:'irving'
	},
	age:26,
	career:'player'
}
let object2 = deepRepeat(object1);
for(let item in object1){
	console.log(item,object1[item]);
}
object1.name.firstName = 'lebron';
console.log(object1);
console.log(object2);

function deep(obj){
	let str = ({}).toString.call(obj);
	let type = str.slice(8,str.length-1).toLowerCase();
	switch(type){
		case 'array':
			let newObject = [];
			for(let key in obj){
				if(typeof obj[key] != 'object'){
					newObject[key] = obj[key];
				}else{
					newObject[key] = deep(obj[key]);
				}
			}
			return newObject;
			break;
		case 'object':
			let newObj = {};
			for(let key in obj){
				if( typeof obj[key] != 'object' ){
					newObj[key] = obj[key];
				}else{
					newObj[key] = deep(obj[key]);
				}
			}
			return newObj;
			break;
	}
};
let a1 = [1,2,3,4,5];
let a2 = deep(a1);
a1[1] = 'asd';
console.log(a1);    // [1,'asd',3,4,5]
console.log(a2);    // [1,2,3,4,5]