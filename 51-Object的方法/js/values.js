//
const obj = {foo:'bar',baz:42};
console.log(Object.values(obj));    // ['bar',42]

// array like object
let oList = document.querySelectorAll('.list>li');
console.log(Object.values(oList));

let ranObj = {
	100:'a',
	2:'b',
	7:'c'
}
console.log(Object.values(ranObj)); // ['b','c','a'];
console.log(Object.values('foo'));  // ['f','o','o'];

console.log( 'foo' == Object('foo') ); // true

let o1 = new Object(undefined);
let o2 = new Object(null);
console.log(o1,o2);
let o3 = new Object({});
console.log(o3);

let obj1 = new Object(true);
let obj2 = new Object(false);
let obj3 = Object('Hello,World');
let obj4 = Object(123);
console.log(obj1,obj2,obj3,obj4);
console.log(Object.entries(obj3));
console.log(Object.entries(obj4));
console.log(Object.entries(Object('foo')));

var array = ['kyrie','lebron','curry'];
console.log(Object.entries(array));
console.log(Object.values(array));
console.log(Object.keys(array));

// simple array
let arr = ['a','b','c'];
console.log( Object.keys(arr) );    // [0,1,2]

// array like object
console.log( Object.keys(oList) );  // [0,1,2]

// array like object with random key ordering
console.log( Object.keys(ranObj));  // [2,7,100]

function Car(name,color){
	this.name = name;
	this.color = color;
}
Car.prototype.say = function(){
	console.log('颜色是' + this.color);
}
let car = new Car('宝马','red');
console.log(Object.keys(car));  //
console.log(Object.getOwnPropertyNames(car));
for(let key in car){
	console.log(key);
}

let myObj = Object.create( {},{
	getFoo:{
		value:function(){
			return this.foo
		}
	}
});
myObj.foo = 'f1';
// myObj.getFoo
console.log(myObj);
console.log(myObj.foo);
console.log( myObj.getFoo() );  // f1
console.log(Object.keys('foo'));

const person = {
	isHuman:false,
	printIntroduction:function() {
		console.log(`My name is ${this.name}`);
	}
}
const me = Object.create(person);
console.log(me);

const p = Object.create(null);
console.log(p);
console.log(p.__proto__ == null);
console.log(me.__proto__ == person);    // true

// 父类
function Shape(){
	this.x = 1;
	this.y = 2;
}
// 父类的方法
Shape.prototype.move = function(x,y){
	this.x += x;
	this.y += y;
	console.info('Shape moved');
}
// Rectangle -- 子类
function Rectangle(){
	Shape.call(this);
}
let rect = new Rectangle();
console.log(rect);
console.log( rect.x );  // 1
console.log( rect.y );  // 2

Rectangle.prototype = Object.create(Shape.prototype);
console.log(Rectangle.prototype.__proto__ == Shape.prototype);  // true;

console.log(Rectangle.prototype.constructor);   // Shape
Rectangle.prototype.constructor = Rectangle;
console.log(Rectangle.prototype.constructor);   // Rectangle

var rect1 = new Rectangle();
console.log(rect,rect1);
console.log(rect1.__proto__);   // Shape
// console.log(rect1.x,rect1.y);   // 1 2
// rect1.move(1,2);    // Shape moved
// console.log(rect1.x,rect1.y);   // 2 4

var f1 = Object.create(null);
var f2 = {};
f2 = Object.create(Object.prototype);

console.log(Object.prototype);
console.log(f1,f2);
console.log(f2.__proto__ == Object.prototype);  // true
console.log(Object.__proto__);
console.log(Object.__proto__.__proto__);
console.log(Object.__proto__.__proto__.__proto__);  // null;

let f3 = Object.create(Object.prototype,{
	foo:{
		writable:true,
		configurable:true,
		value:'Hello'
	},
	bar:{
		configurabel:false,
		get:function(){return 10},
		set:function(value){
			console.log('setting to',value);
		}
	}
});

let Person = function(name){
	this.name = name;
	this.canTalk = true;
}
Person.prototype.greet = function(){
	if(this.canTalk){
		console.log('Hi,I am'+ this.name);
	}
}

var Employee = function(name,title){
	Person.call(this,name);
	this.title = title;
}
Employee.prototype = Object.create(Person.prototype);
console.log( Employee.prototype.__proto__ == Person.prototype );    // true

Employee.prototype.greet = function(){
	if(this.canTalk){
		console.log('Hi I am ' + this.name + ',the' + this.title);
	}
}

let Customer = function(name){
	Person.call(this,name);
}
Customer.prototype = Object.create(Person.prototype);

var Mime = function(name){
	Person.call(this,name);
	this.canTalk = false;
}
Mime.prototype = Object.create(Person.prototype);

var bob = new Employee('Bob','Builder');
var joe = new Customer('Joe');
var rg = new Employee('Red Green','Handyman');
var mike = new Customer('Mike');
var mime = new Mime('Mime');

bob.greet();
joe.greet();
rg.greet();
mike.greet();
mime.greet();


function Player(name){
	this.name = name;
	this.canTalk = true;
}
Player.prototype.say = function(){
	if(this.canTalk){
		console.log('My name is ' + this.name);
	}
}
function Kyrie(name){
	Player.call(this,name);
}
// kyrie.say();    // is not a function
// console.log( kyrie.__proto__ );
// console.log(Kyrie.prototype);
Kyrie.prototype = Object.create(Player.prototype);
// 上面的方法相当于 Kyrie.prototype = new Player();
Kyrie.prototype.constructor = Kyrie;
console.log(Kyrie.prototype);
let kyrie = new Kyrie('kyrie');
console.log(kyrie.canTalk); // true
console.log(kyrie.name);    // kyrie
kyrie.say();
console.log(kyrie);

function classA(name){
	this.name = name;
}
classA.prototype.say = function(){
	console.log('my name is' + this.name);
}

let a = new classA('A');
a.say();
console.log(a.__proto__);