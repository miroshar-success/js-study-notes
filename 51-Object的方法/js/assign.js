// clone obj
const target = {a:1,b:2}
const source = {b:4,c:5}

const returnedTarget = Object.assign(target,source);
console.log(returnedTarget);	// {a:1,b:4,c:5}
console.log(target);			// {a: 1, b: 4, c: 5}

function Player(name,age){
	this.name = name;
	this.age = age;
}
Player.prototype.sayName = function(){
	console.log(`${this.name},${this.age}`);
}
const player = new Player('kyrie',27);
const obj = {
	firstname:'kyrie',
	lastname:'irving'
}
const targetObj = Object.assign(obj,player);
console.log(targetObj,obj);
// targetObj.sayName();	// targetObj.sayName is not a function

const object = {a : 1};
const copy = Object.assign({},object);
console.log(copy);	// {a:1}
copy['a'] = 2;
console.log(object);	// {a : 1}


/* let obj1 = {a : 0, b : {c : 0}};
let obj2 = Object.assign({},obj1);
console.log(obj1,obj2);	// {a : 0, b: {c : 0}}

obj2['b']['c'] = 1;
console.log(obj1); // {a: 0,b: {c: 1}} */


let obj1 = {a : 0,b:{c:1}}
const obj2 = Object.assign({},obj1);
console.log(JSON.stringify(obj2));	// {"a":0,"b":{"c":1}}

obj1.a = 1;
console.log(JSON.stringify(obj1))  // {"a":1,"b":{"c":1}}
console.log(JSON.stringify(obj2)); // {"a":0,"b":{"c":1}}

obj2.a = 2;
console.log(JSON.stringify(obj1));	// {"a":1,"b":{"c":1}}
console.log(JSON.stringify(obj2));	// {"a":2,"b":{"c":1}}

obj2.b.c = 3;
console.log(JSON.stringify(obj1));	// {"a":1,"b":{"c":3}}
console.log(JSON.stringify(obj2));	// {"a":2,"b":{"c":3}}


obj1 = {a : 0, b: {c : 1}};
let obj3 = JSON.parse( JSON.stringify(obj1) );
obj1.a = 4;
obj1.b.c = 4;
console.log(JSON.stringify(obj3));	// {"a":0,"b":{"c":1}}


const o1 = {
	a : 1
}
const o2 = {
	[Symbol('foo')]:2
}
const newObj = Object.assign({},o1,o2);
console.log(newObj)	// {a: 1, Symbol(foo): 2}
console.log(Object.getOwnPropertySymbols(newObj));	// [Symbol(foo)]

const targetObject = {...o1,...o2};
console.log(targetObject);	// {a: 1, Symbol(foo): 2}
console.log(Object.getOwnPropertySymbols(targetObject));	// [Symbol(foo)]


const v1 = 'abc';
const v2 = true;
const v3 = 10;
const v4 = Symbol('foo');
const createObj = Object.assign({},v1,null,v2,undefined,v3,v4);
console.log(createObj);