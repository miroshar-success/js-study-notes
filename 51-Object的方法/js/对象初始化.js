const a = 'foo',b = 42, c = {};
const o = {a,b,c};
console.log(o);

const obj = {
	foo:'bar',
	age:42,
	baz:{
		myprop:12
	}
}
console.log(obj.foo);	// bar
console.log(obj['age'])	// 42
obj.foo = 'baz'
console.log(obj.foo);	// baz


var person = {}
person['firstname'] = 'mario';
person['lastname'] = 'rossi';
console.log(person.firstname);	// mario

person = {'firstname':'john','lastname':'doe'};
console.log(person['lastname'])	// doe


var object = {};
object['1'] = 'value';
console.log(object[1]);	// value

var foo = {unique_prop:1},
	bar = {unique_prop:2},
	object1 = {};
object1[foo] = 'value';
console.log(object1[bar]);	// value

// 计算属性名
var i = 0;
var d = {
	['foo'+ ++i]:i,
	['foo'+ ++i]:i,
	['foo'+ ++i]:i
}
console.log(d.foo1);	// 1
console.log(d.foo2);	// 2
console.log(d.foo3);	// 3


var param = 'size';
const config = {
	[param]:12,
	['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]:4
}
console.log(config);	// {size: 12, mobileSize: 4}

const obj1 = {foo:'bar',x:42};
const obj2 = {foo:'baz',y:43};
const cloneObj = {...obj1};
const mergeObj = {...obj1,...obj2};
console.log(cloneObj,mergeObj);
cloneObj.foo = 'foo';
console.log(obj1,cloneObj);



function Player(name,age){
	this.name = name;
	this.age = age;
	// this.sayName = function(){
	// 	console.log(`${this.name},${this.age}`);
	// }
}
Player.prototype.say = function(){
	console.log(`${this.name},${this.age}`)
}
const kyrie = new Player('kyrie',26);
console.log(kyrie);

const player = {
	firstname:'kyrie',
	lastname:'irving'
}
const mergePlayer = {...kyrie,...player};
console.log(mergePlayer);