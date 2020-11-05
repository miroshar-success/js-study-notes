// isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。

/*    function Foo(){

    }
    var a = new Foo();
    console.log( a instanceof Foo);

    function Bar(){
    }

    Bar.prototype = Object.create(Foo.prototype);
    Bar.prototype.constructor = Bar;*/
// console.log(Bar.prototype instanceof Foo.prototype);
// console.log(Bar.prototype instanceof Foo.prototype.constructor);    // true
function Foo(){}
function Bar(){}
function Baz(){}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

const baz = new Baz();

/*    Baz.prototype.__proto__ = Bar.prototype;
    baz.__proto__ = Baz.prototype;*/

console.log(Baz.prototype.isPrototypeOf(baz));  // true
console.log(Bar.prototype.isPrototypeOf(baz));  // true
console.log(Foo.prototype.isPrototypeOf(baz));  // true
console.log(Object.prototype.isPrototypeOf(baz));   // true

console.log(baz instanceof Object);

// 创建关联
var foo = {
	something:function(){
		console.log('Tell me something good...');
	}
}

var bar = Object.create(foo);
bar.something();

if(!Object.create){
	Object.create = function(obj){
		function F(){}
		F.prototype = obj;
		return new F();
	}
}

var anotherObject = {a:2}
var myObject = Object.create(anotherObject,{
	b:{
		enumerable:false,
		writable:false,
		configurable:false,
		value:3
	},
	c:{
		enumerable:true,
		writable:false,
		configurable:false,
		value:4
	}
});

console.log(myObject);
console.log(myObject.__proto__);

var a = {
	firstName:'kyrie'
}
var b = Object.create(a,{
	lastName:{
		enumerable:true,
		value:'irving',
		configurable:false,
		writable:false
	}
});
console.log(b);
