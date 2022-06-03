"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
const animal = new Animal(1, 3);
console.log(animal.x, animal.y);
class Greeter {
    constructor(otherName) {
        this.name = 'world';
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }
}
const g1 = new Greeter('hello');
const g2 = new Greeter();
console.log(g1.name, g2.name);
class ColorPoint {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
const c1 = new ColorPoint(1, 3);
const c2 = new ColorPoint(1, 4);
console.log(c1.x, c1.y, c2.x, c2.y);
class Scaler {
    constructor(x, y) {
        this.x = 10;
        this.y = 10;
        this.x = x;
        this.y = y;
    }
    scale(s) {
        this.x *= s;
        this.y *= s;
    }
}
const scaler = new Scaler(1, 3);
scaler.scale(3);
console.log(scaler);
class GetLength {
    constructor() {
        this._length = 0;
    }
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
    }
}
const l = new GetLength();
console.log(l.length);
l.length = 10;
console.log(l.length);
class Singer {
    say() {
        console.log('lala');
    }
}
class People {
    run() {
        console.log('run');
    }
    walk() {
        console.log('walk');
    }
}
class Dog {
    move() {
        console.log('move...');
    }
}
class Lee extends Dog {
    woof(times) {
        for (let i = 0; i < times; i++) {
            console.log('woof!');
        }
    }
}
const lee = new Lee();
lee.move();
lee.woof(2);
class Base {
    greet() {
        console.log('Hello, world!');
    }
}
class Derived extends Base {
    greet(name) {
        if (name === undefined) {
            super.greet();
        }
        else {
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}
const derived = new Derived();
derived.greet('jack');
derived.greet();
class BaseClass {
    constructor() {
        this.name = 'base';
        console.log(this.name);
    }
}
class BaseDerived extends BaseClass {
    constructor() {
        super(...arguments);
        this.name = 'derived';
    }
}
const base_derived = new BaseDerived();
class GreeterClass {
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log(`Hello, ${this.name}`);
    }
}
const greeter1 = new GreeterClass('kyrie');
greeter1.greet();
class Reader {
    greet() {
        console.log(`Hello, ${this.getName()}`);
    }
    getName() {
        return 'Irving';
    }
}
class SubReader extends Reader {
    constructor(name) {
        super();
        this.name = name;
    }
    hello() {
        console.log(`Hello, ${this.getName()}`);
        console.log(`Hello, ${super.getName()}`);
        console.log(this.name);
    }
}
const reader = new SubReader('james');
reader.greet();
reader.hello();
console.log(reader['name']);
class Phone {
    constructor(price) {
        this.price = price;
    }
    getPrice() {
        return this.price;
    }
}
const phone = new Phone(5999);
console.log(phone.getPrice());
class MyClass {
    static print() {
        console.log(MyClass.x);
    }
}
MyClass.x = 0;
class SubClass extends MyClass {
}
console.log(MyClass.x);
MyClass.print();
console.log(SubClass.x);
SubClass.print();
class MouseEvent {
    mouseover() { }
    mouseout() { }
}
class MouseEventAdapter extends MouseEvent {
    click() {
    }
    dblclick() {
    }
}
class GreeterName {
    constructor(name) {
        this.name = name;
        this.name = name;
    }
    print() {
        return this.name;
    }
}
function greet(ctor) {
    const instance = new ctor();
    console.log(instance.print());
}
class Box {
    constructor(value) {
        this.contents = value;
    }
}
const box_string = new Box('123');
const box_number = new Box(123);
class Monkey {
    constructor(name) {
        this.get_name = () => {
            return this.name;
        };
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
const monkey = new Monkey('monkey');
const dog = {
    name: 'hello',
    getName: monkey.getName,
    get_name: monkey.get_name
};
console.log(dog.getName(), dog.get_name());
class Player {
    constructor(name) {
        this.name = name;
    }
    get_name() {
        return this.name;
    }
}
const player = new Player('kyrie');
console.log(player.get_name());
const get_name = player.get_name;
class Params {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
const params = new Params(1, 2, 3);
console.log(params.x);
