

# 1. 对象生成方式

```js
// 字面量方式
let obj = {};

// 构造函数
let obj = new Object();
```
    Object = new Function();
    Function = new Functon();
    Function.prototype = new Object();

# 2. 构造函数

    1. 首字母大写
    2. 内部使用this
    3. 没有返回值
    4. 调用函数使用关键字 new 
```js
function Person(){
    this.name = 'kyrie';
}
let p1 = new Person();
console.log(p1.constructor);    // Person


function Person(){
    this.name = 'kyrie';
}
Person.prototype = {
    say:function(){
        console.log(`my name is ${this.name}`);
    }
}
let p1 = new Person();
p1.say();   // my name is kyrie
console.log(p1.constructor);    // Object
```
```js
function Person(){
    this.name = 'kyrie';
}
console.log(Person.prototype.constructor);  // Person


```
# 3. Function

    Function.__proto__ == Function.prototype

    Function创建了Object
```js
Function.constructor;   // Function
Function.prototype == Function.__proto__;   //Function创建了自身
Function.prototype.__proto__ == Object.prototype;   //Function原型的构造函数是Object
Object.__proto__ == Function.prototype; // Object是由Function构造的
Object.prototype.constructor == Object;
Object.prototype.__proto__  == null;    
```

# 4. new关键字

    当代码new Foo()执行时,会发生以下事情:
        1. 一个继承自Foo.prototype的新对象被创建
        2. 使用指定的参数调用构造函数Foo,并将this绑定到新创建的对象.new Foo等同于new Foo().
        3. 由构造函数返回的对象就是new表达式的结果。
    
# 5. Prototype

```js
function Player(){
    this.name = 'kyrie irving';
    this.age = 26
}
// 在Player的原型上添加属性有两种方法
Player.prototype.skill = function(){
    console.log('crossover');
}
Player.prototype.handle = function(){
    console.log('dunk');
}

// 这种方法会覆盖,上门的方法不会。
Player.prototype = {
    skill(){
        console.log('crossover');
    }
}
Player.prototype = {
    handle(){
        console.log('dunk');
    }
}
let kyrie = new Player();   // let kyrie = new Player;  可以不用加括号,有参数的时候需要加括号
console.log(kyrie);
```

# 6. 继承

```js
// 第一种方法:
function ClassA(){
    this.name = '我是函数a';
    this.method = 'say';
}
ClassA.prototype = {
    say(){
        console.log(`我是函数${this.name}`);
    }
}
function ClassB(){
    this.name = '我是函数b';
}

// 将函数A的原型赋值给函数B,这样函数B只能继承函数A原型上的方法,而无法获取函数A构造函数本身的属性
ClassB.prototype = ClassA.prototype;

let a = new ClassA();
let b = new ClassB();

b.say();    // 我是函数b
a.say();    // 我是函数a
console.log( a.method );    // say
console.log( b.method );    // undefined


// 第二种方法：new构造函数A,将他赋值给构造函数B的原型上,这样B既继承了构造函数A原型上的方法,还有函数本身的属性.
ClassB.prototype = new ClassA();
let a = new ClassA();
let b = new ClassB();

a.say();    // 我是函数a
b.say();    // 我是函数b
console.log( a.method );    // say
console.log( b.method );    // say
```

# 7. ES6 的 class

    ES5的构造函数写法
```js
function Point(x,y){
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function(){
    console.log(this.x + this.y);
}
let p = new Point(1,2);
p.toString();   // 3
```

    ES6中引入了Class(类)关键字,作为对象的模板,通过class关键字,可以定义类.基本上,ES6的class可以看作只是一个语法糖.
```js
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString() {
        console.log(this.x + this.y);
    }
}
// 可以new class声明的类,和ES5的构造函数使用方法一致. 构造函数的prototype属性,在ES6的'类'上继续存在.
let p = new Point();
p.toString();
```
    tips:
    1. 定义类的方法时,前面不需要加关键字'function'
    2. 方法之间不需要加逗号分隔,加了会报错.
    3. 类内部定义的方法都是不可枚举的,而ES5在原型上的方法是可枚举的
```js
// 类的方法
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        console.log(this.x + this.y);
    }
}

// 构造函数的方法
function Calc(x,y){
    this.x = x;
    this.y = y;
}
Calc.prototype.toString = function(){
    console.log(this.x+this.y);
}
console.log(Object.keys(Point.prototype));  // []
console.log(Object.keys(Calc.prototype));   // [toString']
```

# 8. hasOwnProperty()

    检测一个对象是否含有特定的自身属性.
```js
let object = new Object();
object.prop = 'exists';

function changeO(){
    object.newprop = object.prop;
    delete object.prop;
}
object.hasOwnProperty('prop');   // true
changeO();      
object.hasOwnProperty('prop');   // false
```

## 8.1. 静态方法

    static 关键字
```js
class Bar{
    constructor(a,b){
        this.a = a;
        this.b = b;
    }
    static classMethod(){
        console.log(this.a+this.b);
    }
}

let bar = new Bar(3,6);
bar.classMethod();  // bar.classMethod is not a function
```

# 9. 包装对象

```js
let s = 'Hello World';
let word = s.substring(s.indexOf(' ')+1,s.length);
```
    字符串可以使用.length .indexOf() .substring() 这些方法的原因是JavaScript会将字符串通过调用new String(s)的方法转传承对象.
    这个对象继承了String对象的方法。并被用来处理属性的引用,一旦属性引用结束,这个新创建的对象就会被销毁.