let {foo,bar} = {foo:'aaa',bar:'bbb'};
console.log(foo,bar);	// aaa bbb

/* 和 数组的解构赋值不同的是,数组的解构赋值和它的顺序很重要,变量的取值由它的位置决定,而对象的解构赋值和位置没有关系
跟变量名有关系 */

let {f,b} = {b:'bbb',f:'fff'};
console.log(f,b)	// fff bbb


// 变量名与属性不一致的情况

let {baz:f1} = {baz:'baz'};
console.log(f1)	// baz

let {first:fi,last:la} = {first:'hello',last:'world'};
console.log(fi,la);	// hello world

/*
综上,对象的解构赋值是找到同名属性,然后给属性值赋值,真正赋值的后者,而不是前者
*/

let obj = {
	p:[
		'Hello',
		{ y:"World"}
	]
}

let {p : [x,{y}]} = obj;
console.log(x,y)	// Hello World

let {p} = obj;
console.log(p);


// 对象解构的默认值,同变量的解构赋值一样,对象的属性值严格等于undefined。
let {m,n = 3} = {m:1,n:2}
console.log(m,n);	// 1 2

let {s = 4, t = 5} = {s:1};
console.log(s,t);	// 1 5


let {r = 5} = {r : undefined};
let {c = 10} = {c : null};
console.log(r,c);	// 5 null


let array = [1,2,3,4,5,6];
let {0:first,[array.length-1]:last} = array;
console.log(first,last);	// 1 6


let {log,sin,cos,PI,round} = Math;
console.log( sin(PI/6).toFixed(1) );	// 0.5 


const [h,i,j,k,l] = 'hello,world';
console.log(h,i,j,k,l);

let {toString:o} = 123;
console.log(o == Number.prototype.toString);	// true;


// 函数参数的解构赋值

function m1([x,y]){
	console.log('sum:',x+y);	// 3
}
m1([1,2]);


let temp = [[1,3],[3,4]].map(([a,b]) => a + b);
console.log('array:',temp);	// [4, 7]


function m2({x = 0, y = 0} = {}){
	console.log('x:',x,'y:',y);
}

m2({x:3,y:8});	// 3, 8
m2({x:undefined,y:4});	// 0 4
m2({});		// 0 0
m2();	// 0 0 


// 为函数m3的参数指定默认值
function m3({x,y} = {x:0,y:0}){
	console.log('x:',x,'y:',y);
}
m3({x:3,y:8});	// 3 8
m3({x:3});	// 3 undefined
m3({});	// undefined undefined
m3();	// 0 0 


console.log( [1,undefined,3].map((x = 'yes') => x) );
// [1,'yes',3];


// 解构赋值的用途

// 1. 变量值的交换
let c1 = 1;
let c2 = 2;
[c1,c2] = [c2,c1];
console.log(c1,c2);	// 2  1

// 2. 从函数返回多个值
function example() {
	return [1,2,3];
}
let [d1,d2,d3] = example();
console.log(d1,d2,d3);	// 1 2 3

function app(){
	return {
		hello:'hello',
		world:'world'
	}
}

let {hello,world} = app();
console.log(hello,world);	// hello world

// 3. 提取json数据
let jsonData = {
	id:42,
	status:'OK',
	data:[867,5309]
}

let {id,status,data} = jsonData;
console.log('id:',id,'status:',status,'data:',data);


// 4. 加载模块指定的方法
const {SourceMapConsumer} = require('source-map');

