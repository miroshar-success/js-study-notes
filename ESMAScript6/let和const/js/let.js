{
	// let a = 1;
	var b = 2;
}
console.log(b);	// a is not defined;

for(let i = 0; i < 10; i++){
}
// console.log(i);	// i is not defined

var arr = [];
for(var i = 0; i < 10; i++){	// i是全局变量,全局只有1个i,
	arr[i] = function(){
		console.log(i);
	}
}
console.log(arr);
arr[5]();	// 10
console.log('i:',i);	// 10;


var temp = [];
for(let i = 0; i < 10; i++){	// let 声明的变量只在本轮有效，每轮循环的都是一个新的变量, 变量i在父作用域
	temp[i] = function(){
		console.log(i);
	}
}
temp[5]();	// 5

for(let j = 0; j < 3; j++){
	let i = 'abc' + '-' + j;
	console.log(i);
}


console.log(undefined_value);	// undefined
var undefined_value = 5;

undefined_v = 10;
console.log(undefined_v);	// 10	 var存在变量提升,let不会存在变量提升。
var undefined_v;


// 暂时性死区, 不允许重复声明
if(true){
	let temp;
	console.log(temp);	// undefined
	temp = 5;
	console.log(temp);	// 5
}


// 块级作用域
var tmp = new Date();

function f1(){
	console.log(tmp);
	if(false){
		var tmp = 'hello world';		// tmp变量会提升到函数
	}
}
f1();	// undefined

function f2(){
	console.log(tmp);
	if(false){
		let tmp = 'hello world';
	}
}
f2();

function f3(){
	console.log(tmp);
	if(true){
		let tmp = '你好,生活';
		console.log('tmp:',tmp);
	}
}
f3();		// 你好,生活

// 块级作用域的作用
function m1(){
	let n = 5;
	if(true){
		let n = 10;
	}
	console.log(n);
}
m1();	// 5;

function m2(){
	var n = 5;
	if(true){
		var n = 10;
	}
	console.log(n);
}
m2();		// 10


// 计数的变量i泄漏为全局变量
var s = 'hello';
for(var i = 0; i < s.length; i++){
	console.log(s[i]);
}
console.log('泄漏的i:',i);	// 5


// 块级作用域中声明函数， ES6允许在块级作用域中声明函数,函数声明类似于var。应避免在块级作用域声明函数
function b1(){
	console.log('I am outside');
}

(function f() {
	if(true) {
		function b1(){
			console.log('I am inside');
		}
	}
	b1();	// I am inside;
})();



// 块及作用域的返回值

function sum(){
	return 3 * 5;
}
// let x = do {	// 提案,在块及作用域前加一个 do
// 	let t = sum();
// 	t * t + 1;
// }
// console.log(x);