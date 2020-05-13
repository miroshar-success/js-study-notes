
# 对象初始化
	
	可以通过new Object() Object.create()方法，或者使用字面量标记初始化对象。
```js
const a = 'foo',b = 42, c = {};
const o = {a,b,c};

// o   {a: "foo", b: 42, c: {…}}

let obj = {
  foo: "bar",
  age: 42,
  baz: { myProp: 12 },
}
```
	Object构造函数为给定值创建一个对象包装其。如果给定值是null或undefined,将会创建并返回
	一个空对象,否则,返回一个与给定值对应类型的对象。
	
	Object(undefined);  // 返回一个空对象
	Object(null);       // 返回一个空对象

## 属性访问
	
	创建对象后，可以读取或者修改它，属性访问器提供了两种方式用于访问一个对象的属性，他们分别是点号和方括号。
```js
var person = {}
person['firstname'] = 'mario';
person['lastname'] = 'rossi';
console.log(person.firstname);	// mario

person = {'firstname':'john','lastname':'doe'};
console.log(person['lastname'])	// doe


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
```

	tips:
	1. 属性名必须是字符串或符号Symbol。非字符串作为对象属性的键，都会通过toString方法，转换为一个字符串。
```js
// Example
var object = {}
object['1'] = 'value';
console.log(object[1]);	// value


var foo = {unique_prop:1},
	bar = {unique_prop:2},
	object = {};
object[foo] = 'value';
console.log(object[bar]);	// value

// 上述代码的输出也是'value',因为对象foo和bar都会被转成相同的字符串。 这个字符串是'[object Object]'
```
    1. obj.a    属性访问
    2. obj['a'] 键访问
    
    在引擎内部，这些值的存储方式是多种多样的，一般并不会存储对象容器内部，存储在对象容器内部的是这项属性的名称。
    他们就像指针(从技术角度来说就是引用)一样，指向这些值真正的存储位置。
    
    
## 计算属性名
	
	从ECMAScript 2015开始，对象初始化语法开始支持计算属性名。其允许在[]中放入表达式，计算结果可以当作属性。
```js
// example1
var i = 0;
var a = {
	['foo'+ ++i]:i,
	['foo'+ ++i]:i,
	['foo'+ ++i]:i
}

console.log(a.foo1); // 1
console.log(a.foo2); // 2
console.log(a.foo3); // 3

// example2
var param = 'size';
const config = {
	[param]:12,
	['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]:4
}
console.log(config);	// {size: 12, mobileSize: 4}
```

## 剩余属性

	可以使用剩余/扩展属性将扩展属性添加到对象文字。它将自己提供的对象的枚举属性复制到一个新的对象上。使用比Object.assign()
	更短的语法，可以轻松克隆(不包括原型)或合并对象。
	
```js
const obj1 = {foo:'bar',x:42};
const obj2 = {foo:'baz',y:43};
const cloneObj = {...obj1};
const mergeObj = {...obj1,...obj2};
console.log(cloneObj,mergeObj);	// {foo:'bar',x:42}	{foo:'baz',x:42,y:43}
cloneObj.foo = 'foo';
console.log(obj1,cloneObj);	// {foo:'bar',x:42}	{foo:'foo',x:42}
```
	tips:
	1. Object.assign()会触发setter,而展开操作符则不会。
	2. 原型上的属性不会被合并.
	3. 是浅复制
```js
function Player(name,age){
	this.name = name;
	this.age = age;
}
Player.prototype.say = function(){
	console.log(`${this.name},${this.age}`)
}
const kyrie = new Player('kyrie',26);
console.log(kyrie);	// Player {name: "kyrie", age: 26}

const player = {
	firstname:'kyrie',
	lastname:'irving'
}
const mergePlayer = {...kyrie,...player};
console.log(mergePlayer);	// {name: "kyrie", age: 26, firstname: "kyrie", lastname: "irving"}
mergePlayer.say();	// is not a function
```

## Object.getOwnPropertyNames()

    Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名(包括不可枚举属性但不包括Symbol值作为名称的属性)
    组成的数组。
    
    数组中的枚举属性的顺序与通过for...in 循环（或Object.keys()）迭代的对象属性一一致。    
    tips:
        1. 不包括原型链上的属性。只会查找对象直接包含的属性。
```js
let arr = ['a','b','c'];
console.log(Object.keys(arr));  // ['0','1','2']
console.log(Object.getOwnPropertyNames(arr));   // ['0','1','2','length']

// 类数组
let obj = {
    0:"a",
    1:"b",
    2:"c"
}
console.log(Object.getOwnPropertyNames(obj));   // ['0','1','2']
```    
    区别:
        1. in 和 Object.hasOwnProperty(...)查找对象上是否有某个属性。不管是否可枚举，
            区别在于in 会查找对象的[Property]原型链，而 hasOwnProperty 不会查找。
            
        2. Object.keys()和Object.hasOwnPropertyNames() 都返回属性列表数组。
            区别在于 Object.keys()返回可枚举属性,而getOwnPropertyNames()会返回所有属性。
            两者都只查找对象本身的属性，不会返回原型链上的属性。
            
# Object.getPrototypeOf()
    
    返回指定对象的原型
```js
const prototype1 = {};
const object1 = Object.create(prototype1);
console.log(Object.getPrototypeOf(object1) === prototype1); // true
console.log( object1.__proto__ === prototype1 );    // true
```
    Object.getPrototypeOf(Object)不是Object.prototype
    
    在JavaScript中的Object是构造函数,一般用法是 ：
    var obj = new Object();
    
    Object.getPrototypeOf(Object)是把Object这一构造函数看做对象。返回的是函数对象的原型
    
    console.log(Object.getPrototypeOf(Object) === Function.prototype )  // true
    console.log(Object.__proto__ === Function.prototype);   // true
    
    Object是Function的实例对象。
    Function.prototype是Object的实例对象
    
# Object.assign()
	
	用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
	Object.assign() 是使用 = 操作符来赋值，它是浅复制
```js
const target = {a:1,b:2}
const source = {b:4,c:5}

const returnedTarget = Object.assign(target,source);
console.log(returnedTarget);	// {a:1,b:4,c:5}
console.log(target);			// {a: 1, b: 4, c: 5}
```
	description:
	1. 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的对象的属性将类似地覆盖前面的源对象的属性，
	2. Object.assign方法只会拷贝源对象自身的并且可枚举的属性到目标对象。
```js
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
console.log(targetObj);	
targetObj.sayName();	// targetObj.sayName is not a function
```

## 复制一个对象
	
```js
const object = {a : 1};
const copy = Object.assign({},object);
console.log(copy);	// {a:1}
copy['a'] = 2;
console.log(object);	// {a : 1}
```

## 深拷贝

	Object.assign()拷贝的是属性值，假如源对象的属性值是一个对象的引用，那么它只能指向那个引用。
```js
let obj1 = {a : 0, b : {c : 0}};
let obj2 = Object.assign({},obj1);
console.log(obj1,obj2);	// {a : 0, b: {c : 0}}

// 返回的obj2目标对象里属性b的值还是一个对象的引用,在下面修改目标对象b属性值时，对应的源对象也修改了
obj2['b']['c'] = 1;
console.log(obj1); // {a: 0,b: {c: 1}}
```

```js
// example from mdn
const obj1 = {a : 0,b:{c:1}}
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


// Deep clone
const obj1 = {a : 0, b: {c : 1}};
let obj3 = JSON.parse( JSON.stringify(obj1) );
obj1.a = 4;
obj1.b.c = 4;
console.log(JSON.stringify(obj3));	// {"a":0,"b":{"c":1}}
```

## 拷贝symbol类型的属性

```js
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
```
	tips: 
	1. 继承属性和不可枚举属性是不能拷贝的
	2. 原始类型会被包装为对象

# Object.defineProperty()

    Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。
    
    Object.defineProperty(obj,prop,descriptor)
    
    tips:
       1. 该方法允许精确添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，能够在属性枚举期间呈现出来
       (通过for...in 或 Object.keys()方法 )，这些属性的值可以被改变，也可以被删除。
       2. 通过Object.defineProperty()添加的属性值是不可修改的
       
    1. configurable: 默认false, 为true时属性值才能被改变，同时该属性也能从对象上被删除
    2. enumerale: 默认false, 为true时，才能够枚举 定义对象属性是否可以在for...in 和 Object.keys()中被枚举
    3. value: 属性对应的值,默认undefined
    4. writable: 默认false, 为true时value才能被赋值运算符改变。
```js
// 没有配置 configurable writable 和 enumerable选项时
let player = {}
Object.defineProperty(player,'name',{
    value:'kyrie'
});
player.name = 'lebron';
console.log(player);    // {name: "kyrie"}

delete player.name;
console.log(player);    // {name: "kyrie"}

for(key in player){
    console.log(key);
}
```
```js
// 配置了configurable, enumerable 和 writable 时
let player = {}
Object.defineProperty(player,'name',{
    value:'kyrie',
    enumerable:true,
    configurable:true,
    writable:true
});
player.name = 'lebron';
console.log(player);    // {name: "lebron"}

delete player.name;
console.log(player);    // {}

for(key in player){
    console.log(key);   // name
}
```

## 属性描述符
    
    在ES5 之前,JavaScript语言本身并没有提供可以直接检测属性特性的方法。从ES5开始,所有的属性都具备了属性描述符。
        Object.getOwnPropertyDescriptor(obj,property);
    
    对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
    1. 数据描述复是一个具有值的属性,可能是可写的，也可能是不可写的
    2. 存取描述符是由getter-setter函数对描述的属性
    
    数据描述符和存取描述符均具有以下可选键值：enumerable和configurable
    数据描述符的可选键值：value writable
    存取描述符的可选键值：set get 默认undefined
        set:
            一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，
            触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
        get:
            一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，
            但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）.
        
```js
// 在对象中添加一个 属性与数据描述符的示例
let o = {};
Object.defineProperty(o,'a',{
    value:37,
    enumerable:true,
    configurable:true,
    writable:true
})
console.log(o)  // {o:37}

// 在对象中添加一个属性与存取描述符的示例
var bValue;
Object.defineProperty(o,'b',{
    get:function(){
        return bValue;
    },
    set:function(newValue){
        bValue = newValue;
    },
    configurable:true,
    enumerable:true
})
console.log(o)
o.b = 38;
```    

### Configurable

    只要属性是可配置的，就是可以通过defineProperty(...)属性来修改属性描述符;

    使用Object.defineProperty(...)定义对象时，enumerable , configurable 和 writable 属性描述符默认为false。
```js
var phone = {};
Object.defineProperty(phone,'brand',{
    value:'apple',
});
console.log(Object.getOwnPropertyDescriptor(phone,'brand'));
// {value: "apple", writable: false, enumerable: false, configurable: false}
```
    tips:
        1. 如果使用Object.defineProperty(...)定义一个属性,将configurable设置为false时. 再修改属性描述符
            enumerable writable configurable会报错。但是有一个例外：
            tips: writable从true修改为false,不会报错。但是无法从false修改为true。
    
    configuable不仅控制着属性描述符是否可以被修改，还控制属性是否可以被删除。
```js
var computer = {
    brand:'Apple'
}
console.log(computer.brand);    // Apple
delete computer.brand;
console.log(computer.brand);    // undefined


// 给computer的brand属性描述符 configurable设置为 false,不能使用delete删除brand。
const computer = {};
Object.defineProperty(computer,'brand',{
    value:'Apple',
    enumerable:true,
    writable:true,
    configurable:false
});
console.log(computer.brand);    // Apple
delete computer.brand;
console.log(computer.brand);    // Apple
```
    
![Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

## Getter和Setter

    当给一个属性定义setter和getter 或者两者都有时,这个属性会被定义为'访问描述符'。
    在ES5中可以使用getter和setter部分改写默认操作，但是只能应用在单个属性上。无法应用在整个属性上。
```js
var obj4 = {
    count:1,
    get:function(){
        return this.count;
    },
    set:function(value){
        this.count = value;
    }
}
console.log('obj4.count:',obj4.count);
obj4.count = 5;
console.log(obj4.count);
```
# 不变性

## Object.preventExtensions(...)

        Object.preventExtensions()方法让一个对象变得不可扩展，也就是永远不能再添加新的属性。
    
    Description:
        如果一个对象可以添加新属性,则这个对象是可扩展的.Object.preventExtensions()将对象标记为不再可扩展。
        这样它将永远不会具有它被标记为不可扩展时持有的属性之外的属性。 一般来说,不可扩展属性可能仍然被删除。
        
            tips: Object.preventExtensions()仅阻止添加自身的属性。但其对象类型的原型依然可以添加新的属性。
                  不可扩展对象的原型是不可变的。
```js
const phone = {
    name:'iPhone 6s'
}
Object.preventExtensions(phone);

phone.color = 'pink';
console.log(phone); // {name: "iPhone 6s"}

phone.__proto__.say = function(){
    console.log(this.name);
}
phone.say();    // iPhone 6s;

delete phone.name;
console.log(phone); // {}
```

## Object.seal()

    Object.seal() 会创建一个"密封"的对象,这个方法实际上会在一个现有对象上调用Object.preventExtensions() 并把现有属性
    标记为 configurable:false。
        密封之后,不仅不能添加属性,也不能修改属性描述符 或者 删除属性。
        
## Object.freeze()

    Object.freeze() 会创建一个冻结对象。这个方法会在一个现有对象上调用Object.seal() 并把所有 数据访问的 writable标记为false。
    这样就无法修改他们的值。
        这个方法是你可以应用在对象上的级别最高的不可变性。它会禁止对于对象本身及其任意直接属性的修改。
```js
var foo = {
    age:27
}
var object = {
    firstName:'kyrie',
    lastName:'irving',
    foo
}
console.log(object);

Object.freeze(object);

object.firstName = 'lebron';
console.log(object.firstName);    // Kyrie

object.foo.age = 30;
console.log(object.foo.age);    // 30
```
    
# 2. Object.hasOwnProperty()

    返回一个布尔值,指示对象自身属性中是否具有指定的属性。

    所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象
    是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

```js
const obj = {
    a:undefined
}
console.log('a:',obj.a);    // undefined
console.log('b:',obj.b);    // undefined
```
    仅通过返回值,无法判断一个属性是存在并且持有一个undefined的值，还是变量不存在。
    可以通过 Object.hasOwnProperty()判断对象是否有某个属性。
        tips:
        1. in 操作符会检查属性是否在对象及其[Prototype]原型链中。
        2. hasOwnProperty(...)只会检查属性是否在对象上,不会检查原型链上的属性。
        
    创建的普通对象都可以通过对于Object.hasOwnProperty的委托来访问hasOwnProperty(...)。但是通过Object.create(null)
    创建的对象无法链接到 hasOwnProperty(...).
        Object.prototype.hasOwnProperty.call(object,[property]);
```js
const player = {
    name:'James'
}
player.__proto__.age = 35;
console.log(player.hasOwnProperty('name')); // true
console.log(player.hasOwnProperty('age'));  // false

console.log( ('name' in player) );  // true
console.log( ('age' in player) );   // true
```
    
# 3. Object.entries()

    Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组。其排列与使用for...in循环遍历该对象时返回的顺序一致。

    tips:
    1. 如果对象的键值是数字,则遍历顺序会按从小到大遍历出。
    2. Object.entries() 不会遍历出原型链上的属性,而for...in会遍历出。
```js
const obj = {foo:'bar',baz:42};
console.log(Object.entries(obj));   // [ ['foo', 'bar'], ['baz', 42] ]

// arrayLike
let arrayLike = {
    0:'a',
    1:'b',
    2:'c',
}
for(let [key,value] of Object.entries(arrayLike)){
    console.log(key,value);
}

// randomObj
const ranObj = {
    100:'a',
    2:'b',
    7:'c'
}
Object.entries(ranObj);    // [ ["2", "b"],["7", "c"],["100", "a"] ]

// 和for... in返回的顺序相同
for(let key in ranObj){
    console.log(key,ranObj[key]);   // 2 a  7 c  100 a
}

const obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

// 非对象强制转换为对象遍历
Object.entries('foo');  // [[0,f],[1,o],[1,o]]

// 通过forEach遍历
Object.entries(obj).forEach(([k,v]) =>{
    console.log(k,v);
});
```

# 4. Object.values()

    该方法返回一个给定对象自身的所有可枚举属性值的数组,值的顺序与使用for...in循环的顺序相同(区别在于for-in循环枚举原型链中的属性)。

```js
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
```

# 5. Object.keys()

    该方法会返回一个由一个给定对象的自身可枚举属性组成的数组,数组中属性名的排列顺序和使用for-in
    循环遍历该对象时返回的顺序一致。

```js
// simple array
let arr = ['a','b','c'];
console.log( Object.keys(arr) );    // [0,1,2]

// array like object
console.log( Object.keys(oList) );  // [0,1,2]

// array like object with random key ordering
console.log( Object.keys(ranObj));  // [2,7,100]
```

# 6. Object.create()

    该方法创建一个新对象,使用现有的对象来提供新创建对象的__proto__.

    Object.create(proto,[prototiesOobject]);
    1. proto
        新创建对象的原型对象。
    2. propertiesObject
        可选,如果没有指定为undefined,则是要添加到新创建对象的可枚举属性,对象的属性描述符以及响应的属性名称。

	以字面量方式创建的空对象就相当于：o = {}
	o = Object.create(Object.prototype);
	
```js
function Player(name){
    this.name = name;
    this.canTalk = true;
}
Player.prototype.greet = function(){
    if(this.canTalk){
        console.log('my name is ' + this.name);
    }
}

function Kyrie(name){
    Player.call(this,name);
}
Kyrie.prototype = Object.create(Player.prototype);
Kyrie.prototype.constructor = Kyrie;

let kyrie = new Kyrie('kyrie');
kyrie.name  // kyrie
kyrie.say();    // my name is kyrie
```

```js
// example

const person = {
	isHuman:false,
	printIntroduction:function(){
		console.log(`my name is ${this.name}. Am I human? ${this.isHuman}`)
	}
}
const me = Object.create(person);
console.log(me);	// {}
console.log(me.__proto__);	// {isHuman:false,printIntroduction:f}

me.name = 'jack';
me.printIntroduction();	// my name is jack. Am I human? false
me.isHuman = true;
me.printIntroduction();	// my name is jack. Am I human? true
```
```js
// ajax封装 from mdn

// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
```

## 使用Object.create的propertyObject参数

```js
const e = Object.create(Object.prototype,{
	foo:{
		writable:true,
		configurable:true,
		value:'hello'
	}
})
console.log(e);	// {foo: "hello"}


const c = Object.create(Object.prototype,{
	p:{
		value:42
	}
});
c.p = 24;
console.log(c.p)	// 42 

// 省略了的属性特性默认为false,所以属性p是不可写，不可枚举，不可配置的

c.q = '我是可枚举的';
for(let key in c){
	console.log(key);	// q
}
delete c.p
console.log(c)	// {q: "我是可枚举的", p: 42}

// 创建一个可以写,可以枚举,可以配置的属性p 
const o2 = Object.create(Object.prototype,{
	p:{
		value:42,
		writable:true,
		enumerable:true,
		configurable:true
	}
});
console.log(o2)
```

# 7. Object.is()

    判断两个值是否相同。
    如果下列任何一项成立,则两个值相同：
    1. 都是undefined
    2. 都是null
    3. 都是true或者都是false
    4. 都是由相同个数的字符按照相同的顺序组成的字符串
    5. 两个值是数字并且
        都是正0
        都是负0
        都是NaN
        都是除0和NaN外的其他同一数字
    6. 指向同一个对象

    
# Object.prototype.toString()

	Object.toString()方法返回一个表示该对象的字符串。
```js
function Dog(name) {
  this.name = name;
}

var dog1 = new Dog('Gabby');

Dog.prototype.toString = function dogToString() {
  return '' + this.name;
}

console.log(dog1.toString());
```
	
	默认情况下，toString()方法被每个object对象继承。如果此方法在自定义对象中未被覆盖，toString()返回'[object type]'，
	其中type是对象的类型
	

    可以通过toString()来获取每个对象的类型。为了每个对象都能通过Object.prototype.toString()
    来检测,需要以Function.prototype.call()或Function.prototype.apply()的形式来调用,传递
    要检查的对象作为第一个参数。
    
 ```js
 var toString = Object.prototype.toString;
 
 toString.call(new Date); // [object Date]
 toString.call(new String); // [object String]
 toString.call(Math); // [object Math]
 
 //Since JavaScript 1.8.5
 toString.call(undefined); // [object Undefined]
 toString.call(null); // [object Null]
 ```
 
 ## 覆盖默认的tosString方法
 
	可以自定义一个方法，来取代默认的tosString()方法，该tosString()方法不能传入参数，并且必须返回一个字符串。
	自定义的tosString方法可以是任何我们需要的值。
```js
function Dog(name,breed,color,sex) {
  this.name = name;
  this.breed = breed;
  this.color = color;
  this.sex = sex;
}

var theDog = new Dog("Gabby", "Lab", "chocolate", "female");		
// 当前的对象调用了toString()方法，它将会返回从object继承而来的toString()方法返回默认值  
theDog.toString()	// [object Object]
```
	
	下面的代码定义一个叫做dogToString()方法覆盖默认的toString()方法。
```js
Dog.prototype.toString = function dogToString(){
	return `Dog ${this.name} is a ${this.sex} ${this.color} ${this.breed}`;
}
调用toString()方法时会自动调用dogToString()方法，并且返回以下字符串：
theDog.toString() 	// 'Dog Gabby is a female chocolate Lab'
```

# 基本包装类型

    为了便于操作基本类型值,ECMAScript提供了3个特殊的引用类型:Boolean,Number和String。每当
    读取一个基本类型值得时候,后台就会创建一个对应的基本包装类型。
    
    tips:
    引用类型与基本包装类型的主要区别就是对象的生存期,使用new 操作符创建的引用类型的实例,在执行
    流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象,则只存在于一行代码
    的执行瞬间。
    
# 遍历

    for...of     Iterator接口的目的，就是为了所有数据结构提供一种统一的访问机制，即for...of循环。
    当使用for...of循环遍历某种数据结构，该循环会自动去寻找Iterator接口。
    
    tips:
        1. 默认的Iterator接口部署在数据结构的Symbol.iterator属性。
````js
const myArray = [1,2,3];__
for(let value of myArray){
    console.log(value);
}
````
    for...of循环会首先向被访问的对象请求一个迭代器对象，然后通过调用迭代器对象的next()方法来遍历
    所有返回值。
```js
const myArray = [1,2,3];
const it = myArray[Symbol.iterator]();
console.log(it);
console.log( it.next() );   // {value:1,done:false}
console.log( it.next() )    // {value:2,done:false}
console.log( it.next() );   // {value:3,done:false}
console.log( it.next() );   // {value:undefined,done:true}
```
    Symbol.iterator 指向该对象的默认遍历器方法。和数组不同，普通对象没有内置的@@iterator,所以无法自动完成for...of遍历。
    
    
    部署了Iterator的数据结构:
        Array/Map/Set/String/arguments/NodeList对象。

    给对象一个遍历器接口        
```js
Object.defineProperty(player,Symbol.iterator,{
    enumerable:false,
    writable:false,
    configurable:true,
    value:function(){
        var self = this;
        var idx = 0;
        var keys = Object.keys(self);
        return {
            next:function(){
                return {
                    value:self[keys[idx++]],
                    done:(idx > keys.length)
                }
            }
        }
    }
});
```
    
    
    
    
    
    
    
    
    
    
    
    
    
    