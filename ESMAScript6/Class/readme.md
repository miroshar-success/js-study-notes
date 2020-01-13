# ES5生成实例对象的方法

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```
    将上面的代码使用ES6的class改写
```js
class Point{
    /*构造方法,this表示实例对象  ES5的构造函数Point对应ES6的构造方法*/
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return this.x + this.y;
    }   
}
Point === Point.prototype.constructor   // true
```

## class和ES5构造函数区别

```js
class Player{
    constructor(firstName,lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
    say(){
        console.log(`my name is ${this.firstName}-${this.lastName}`);
    }
    greet(){
        console.log('hello');
    }
}
let player = new Player('kyrie','irving');

// class 关键字定义的类内部的方法都是不可枚举的,而实例对象原型上的方法是可枚举的
Object.keys(Player.prototype);  // []
Object.getOwnPropertyNames(Player.prototype);   // ['say','greet','constructor']
```
```js
function Player(firstName,lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}
Player.prototype.say = function(){
    console.log(`my name is ${this.firstName}-${this.lastName}`);
}
Player.prototype.greet = function(){
    console.log('hello');
}
let player = new Player('kyrie','irving');
console.log(Object.keys(Player.prototype)); // ['say','greet']
console.log(Object.getOwnPropertyNames(Player.prototype));  // ["constructor", "say", "greet"]
for(let key in Player.prototype){
    console.log(key);   // say greet
}
```

## 类的实例

    属性除非显式地定义在其本身上（即定义在this对象上），否则都是定义在原型上。（即定义在class上）
    
```js
class Pointer {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        console.log(this.x + this.y);
    }
}
const p = new Pointer(1,2);
p.toString();   // 3
console.log(p.hasOwnProperty('x')); // true
console.log(p.hasOwnProperty('y')); // true
console.log(p.hasOwnProperty('toString'));  // false
console.log(p.__proto__.hasOwnProperty('toString'));    // true
```
    
    tips:
    1. 类和模块的内部,默认就是严格模式
    2. 不存在变量提升，且必须保证子类在父类之后定义
    3. 类的方法内部如果含有this,它默认指向类的实例。但是 一旦单独使用该方法,可能会报错。
    
## 静态方法

    类相当于实例的原型,所有在类中定义的方法，都会被实例继承。如果一个方法前加上关键字static,表示该方法不会被实例继承,
    而是直接通过类来调用。这就称为"静态方法"
```js
class Foo {
    static classMethod(){
        console.log('Hello');
    }
}
let foo = new Foo();
// foo.classMethod();  //  foo.classMethod is not a function
Foo.classMethod()   // Hello 
```
    tips:
    1. 如果静态方法包含this关键字,这个this指的是类，而不是实例。
    2. 父类的静态方法可以被子类继承
```js
class Bar {
    static bar(){
        this.baz()  // 静态方法的this指向的是Bar构造方法
    }
    static baz(){
        console.log('静态方法baz');
    }
    baz(){
        console.log('原型上的方法baz')
    }
}
Bar.baz();   // 静态方法baz
let bar = new Bar();
bar.baz();  // 原型上的方法baz

class ChildBar extends Bar{
}

ChildBar.bar(); // 静态方法baz
```
    
## 实例属性的新写法

    实例属性除了定义在constructor里，也可以直接定义在类的最顶层。
```js
class IncresingCounter {
    constructor(){
        this._count = 0;
    }
    increment(){
        this._count++;
        console.log(this._count);
    }
}
let increase = new IncresingCounter();
increase.increment();   // 1

class Father  {
    bar = 'hello';
    baz = 'world';
}
let f = new Father();
console.log(f.bar); // hello
console.log(f.baz); // world
```

# Class继承

    class可以通过extends关键字实现继承。
```js
// 父类
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }   
    toString(){
        return `${this.x + this.y}`
    }
}

// 子类
class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y); // 调用父类的constructor(x,y)
        this.color = color;
    }
    toString(){
        return this.color + " " + super.toString()  // 调用父类的toString()
    }
}
```
    tips:
    1. 子类必须在constructor方法中调用super方法,否则新建实例时会报错。子类自己的this对象必须先通过父类的
    构造函数完成塑造。
    2. 如果子类没有定义constructor方法,这个方法会被默认添加。
    3. 在子类的构造函数中,只有调用super之后，才可以使用this关键字。
    4. 父类的静态方法,也会被子类继承
```js
class A {
    static hello (){
        console.log('hello world');
    }
}
class B extends A {}
B.hello();  // hello world
```

# super关键字

    super既可以当函数使用,也可以当对象使用。
    1. super作为函数调用时,代表父类的构造函数。ES6要求,子类的构造函数必须执行一次super函数。
```js
class A {}
class B extends A {
    constructor(){
        super()
    }
}
```
    子类B的构造函数之中的super()，代表调用父类的构造函数.这是必须的，否则JavaScript引擎会报错！
        tips:
        1. super虽然代表了父类Ade构造函数,但是返回的是子类B的实例,即super内部的this指的是B的实例。
        2. 作为函数时，super只能用在子类的构造函数之中，用在其他地方就会报错！
    
    
    2. super作为对象时,在普通方法中，指向父类的原型对象;在静态方法中，指向父类
        
        tips:
        1. 由于super指向父类的原型，所以定义在父类实例上的方法或属性,是无法通过super调用的。
```js
class Foo{
    constructor(){
        this.name = 'kyrie'
    }
    sayName(){
        console.log(this.name);
    }
}
// 定义在父类原型对象上的属性,可以通过super获取到
Foo.prototype.name = 'irving'

class Bar extends Foo{
    say(){
        console.log( super.name );      //由于super指向父类的原型,无法获取到父类实例上的属性,undefined
        super.sayName()
    }
}
let bar = new Bar();
bar.say()
```
```js
class A{
    static p(){
        console.log('父类的静态方法');
    }
    p(){
        console.log('父类的方法');
    }
}
class B extends A {
    constructor(){
        super()
    }
    say(){
        super.p()
    }
    static say(){
        super.p()
    }
}
let b = new B();
B.say();    // 父类的静态方法
b.say();    // 父类的方法
```

# this指向

    1. ES6规定，在子类普通方法中通过super调用父类的方法时,方法内部的this指向当前的子类实例。
    2. 由于this指向子类实例，所以如果通过super对某个属性赋值,这时super就是this,赋值的属性会变成子类实例的属性。
```js
class Father{
    constructor(){
        this.x = 1
    }
    print(){
        console.log(this.x);
    }
}
let father = new Father();
father.print(); // 1

class Son extends Father{
    constructor(){
        super();
        this.x = 2;
        super.x = 3;    // super指的就是子类的this,所以this.x = 3 super指向父类的原型,而原型上没有x，所以为undefined
        console.log(super.x);   // undefined
        console.log(this.x);    // 3
    }
    m(){
        super.print();
        /* super.print()虽然调用的是Father.prototype.print(),但是Father.prototype.print()内部的this
        *   指向的是子类Son的实例，所以输出的是2. 实际上执行的是 super.print.call(this)
        * */
    }
}
let son = new Son();
son.m();    // 2
```

## 静态方法中的super

    如果super作为对象,用在静态方法之中，这时super将指向父类，而不是父类的原型对象！
```js
class Parent{
    constructor(){
        this.x = 2;
    }
    static myMethod(msg){
        console.log('static',msg);
    }
    myMethod(msg){
        console.log('instance',msg);
    }
    static print(){
        console.log(this.x);
    }
}

class Child extends Parent{
    constructor(){
        super();
        this.x = 3;
    }
    static myMethod(msg){
        // 静态方法中的super指向父类
        super.myMethod(msg)
        // 静态方法里 super.print()指向父类的静态方法,这个方法里面的this指向的是Child,而不是Child的实例
        super.print();
    }
    myMethod(msg){
    // 普通方法中的super指向父类的原型
        super.myMethod(msg);
    }
}
Child.x = 4;
Child.myMethod(1);  // static 1
let child = new Child();
child.myMethod(1);  // instance 1
```

## 类的prototype 和 __proto__
    
    1. 子类的__proto__属性,表示构造函数的继承,总是指向父类。
    2. 子类prototype属性的__proto__属性,表示方法的继承，总是指向父类的prototype属性
    
```js
class Big {
    constructor(){
        this.name = 'lebron';
    }
    say(){
        console.log(this.name);
    }
}
class Small extends Big{
    constructor(){
        super()
    }
}
let small = new Small();
console.log(small.name);    // lebron
console.log(small.__proto__.constructor);   // Big
console.log(Small.prototype.__proto__ === Big.prototype);   // true
console.log(Small.prototype.constructor);   // Big
```
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    