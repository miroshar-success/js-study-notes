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