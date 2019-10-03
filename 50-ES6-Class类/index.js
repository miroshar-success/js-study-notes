// 构造函数
function Point(x,y){
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function(){
    console.log( this.x + this.y );
}

let p = new Point(2,3);
p.toString();   // 5

// ES6 的class可以看作是一个语法糖,

class Points{
    // 构造方法,this关键字代表实例对象
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    // tips: 1. 方法之前不用加function关键字
    // 2. 方法之间不需要加逗号
    toString(){
        console.log(this.x + this.y);
    }
}
let newP = new Points(3,5);
newP.toString();    // 8
console.log(typeof Points);         // function
console.log(Points == Points.prototype.constructor);    // true

class Bar{
    doStuff(){
        console.log('stuff');
    }
}
let bar = new Bar();
bar.doStuff();      // stuff


class Player{
    constructor(name){
        this.name = name;
    }
    say(){
        console.log(this.name);
    }
    skill(){
        console.log('crossover');
    }
}
let player = new Player('kyrie');
player.say();   // kyrie
player.skill(); // crossover
console.log(player.__proto__);  
/* 
{constructor:f say:f,skill:f}
*/ 
console.log(player.__proto__ == Player.prototype);  // true
console.log(Player.prototype);  
// {constructor:f say:f,skill:f}

console.log(player.constructor === Player.prototype.constructor);   // true

// 在类的实例上面调用方法,其实就是调用原型上的方法


class Car{
    constructor(name){
        this.name = name;
    }
}
Object.assign(Car.prototype,{
    color(){console.log(this.name + '颜色是黑色')},
    size(){console.log(this.name + '长度是三米')},
});

let car = new Car('BMW');
car.color();
car.size();
console.log(Car.prototype);

class Animal{
    constructor(name){
        this.name = name;
    }
    say(){
        console.log(this.name);
    }
    color(){
        console.log('颜色是黑色');
    }
}
let cat = new Animal('小花');
cat.say();
cat.color();

for(let key in cat){
    console.log(key);
}
// 不可遍历的
// for(let item of cat){
//     console.log(item);
// }

for(let key of Object.keys( Animal.prototype )){
    console.log(key);
}


function Cat(name){
    this.name = name;
}
Cat.prototype = {
    say:function(){
        console.log('名字是' + this.name);
    },
    color:function(){
        console.log('颜色是黑色');
    }
}

let fat = new Cat('小黑');
fat.say();
fat.color();

for(let key in fat){
    console.log(key);
    console.log(fat[key]);
}
// for(let item of fat){
//     console.log(item);
// }

class Foo{
    constructor(){
        return Object.create(null);
    }
}
console.log( new Foo() instanceof Foo );    // false

// Foo();

class Bee{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        console.log(this.x + this.y);
    }
}

let bee = new Bee(3,8);
bee.toString();

console.log( bee.hasOwnProperty('x') ); // true
console.log( bee.hasOwnProperty('y') ); // true
console.log( bee.hasOwnProperty('toString') );  // false
console.log( bee.__proto__.hasOwnProperty('toString') );    // true
console.log( Bee.prototype.hasOwnProperty('toString') );    // true


let bee1 = new Bee(3,2);
let bee2 = new Bee(2,3);

console.log( bee1.__proto__ === bee2.__proto__ );   // true

bee1.__proto__.bee = function(){
    console.log(this.x - this.y);
}
bee1.bee(); // 1

let p1 = new Point(2,3);
let p2 = new Point(3,2);

p1.__proto__.printName = function(){
    console.log('Oops');
}
p1.printName();     // Oops
p2.printName();     // Oops

let p3 = new Point(4,2);
p3.printName();     // Oops

class MyClass{
    constructor() {}
    get prop(){
        return 'getter';
    }
    set prop(value){
        console.log('setter:' + value);
        // setter : 123
    }
}

let inst = new MyClass();
inst.prop = 123;    // 
console.log( inst.prop );   // getter

class CustomHTMLElement{
    constructor(element){
        this.element = element;
    }
    get html(){
        return this.element.innerHTML;
    }
    set html(value){
        this.element.innerHTML = value;
    }
}

let descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype,'html'
);

console.log( 'get' in descriptor ); // true
console.log( 'set' in descriptor ); // true


const nClass = class Me{
    getClassName(){
        console.log( Me.name );
    }
};

let int = new nClass();
int.getClassName(); //  Me
// Me.name;     Me is not defined

let person = new class{
    constructor(name){
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('张三');

person.sayName();   // 张三

// new Food();
// class Food{};    Food is not defined

{
    let Foo = class{};
    class Bar extends Foo{

    }
}

console.log( Point.name );  // Point
console.log( nClass.name);  // Me
// console.log( Me.name);      // 


class Fool {
    static classMethod() {
        console.log('Hello');
    }
}

Fool.classMethod(); // Hello

let fool = new Fool();
// fool.classMethod();  // is not a function

class Baz {
    static foo(){
        this.foo();
    }
    static foo(){
        console.log('Hello');
    }
    foo() {
        console.log('World');
    }
}
Baz.foo();  // Hello 

// class Fly{
//     static classMethod(){
//         console.log('I can fly');
//     }
// }
// class Beat extends Fly{

// }
// Beat.classMethod();     // I can fly

class Fly{
    static classMethod(){
        return 'I can Fly';
    }
}

class Beat extends Fly{
    static classMethod(){
        console.log( super.classMethod() + ', too' );
    }
}
Beat.classMethod(); 

class IncreasingCounter{
    constructor(){
        this._count = 0;
    }
    get value() {
        console.log(`Getting the current value!`);
        return this._count;
    }
    increment() {
        this._count++;
    }
}
