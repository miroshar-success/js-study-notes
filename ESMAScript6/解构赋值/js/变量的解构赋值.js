let [foo,bar,baz] = [1,2,3];
console.log(foo,bar,baz);	// 1 2 3

let [x,,y] = [1,2,3];
console.log(x,y);	// 1 3

let [head,...tail] = [1,2,3,4,5,6,7,8];
console.log(head,tail)	// 1	[2,3,4,5,6,7,8];

// 不完全解构
let [x1,y1] = [1,2,3,4,5];
console.log(x1,y1)		// 1 2


// 解构不成功
// let [a] = 1;	
// let [b] = false;
// let [c] = NaN;
// let [d] = undefined;
// let [e] = {};


// 默认值
let [a = true] = [];
console.log(a)	// true

let [b,c = 1] = [1,2];
console.log(b,c);	// 1, 2

let [d,e = 2] = [1];
console.log(d,e);	// 1 2

let [m=1,n=1] = [undefined,null];	// 如果数组成员不严格等于undefined,默认值是不会生效的。
 console.log(m,n);	// 1,null
 
 
function f1(){
	console.log('aaaaa');
}
let [p = f1()] = [1];		// 惰性求值

let [q = f1()] = [undefined];
console.log(p,q)	// 1 undefined
