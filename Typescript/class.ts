class Animal {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
const animal = new Animal(1, 3)
console.log(animal.x, animal.y) // 1 3

// ----------- strictPropertyInitialization ---------

// ----- readonly -----
class Greeter {
  readonly name: string = 'world'
  constructor(otherName?: string) {
    if(otherName !== undefined) {
      this.name = otherName
    }
  }
}
const g1 = new Greeter('hello')  // hello
const g2 = new Greeter()         // world
console.log(g1.name, g2.name)
// g.name = '123'  // error


// ---------- constructors -----------
class ColorPoint {
  x: number;
  y: number;
  constructor(x:number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }
}
const c1 = new ColorPoint(1, 3)
const c2 = new ColorPoint(1, 4)
console.log(c1.x, c1.y, c2.x, c2.y)

// --------------- methods -----------------
class Scaler {
  x: number = 10;
  y: number = 10;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  scale(s: number): void {
    this.x *= s
    this.y *= s
  }
}
const scaler = new Scaler(1, 3)
scaler.scale(3)
console.log(scaler) // { x: 3, y: 9 }


// ---------- getters/ setters ----------
class GetLength {
  private _length: number = 0
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value
  }
}
const l = new GetLength()
console.log(l.length) // 0
l.length = 10
console.log(l.length) // 10

/*
1. if get exist but no set, the property is automatically readonly
2. if the type of setter parameter is not specified, it is inferred from the return type of the getter
3. getters and setters must have the same member visibility
*/

//  -------- implements ----------
interface Sayable {
  say(): void
}
class Singer implements Sayable {
  say() {
    console.log('lala')
  }
}

interface Run {
  run(): void
}
interface Walk {
  walk(): void
}
class People implements Run, Walk {
  run() {
    console.log('run')
  }
  walk() {
    console.log('walk')
  }
}

// ----------------- extends -----------------
class Dog {
  move() {
    console.log('move...')
  }
}
class Lee extends Dog {
  woof(times: number) {
    for(let i = 0; i < times; i++) {
      console.log('woof!')
    }
  }
}
const lee = new Lee()
lee.move()    // move...
lee.woof(2)   // woof! woof!


// ----------------- overriding methods ------------------
class Base {
  greet() {
    console.log('Hello, world!')
  }
}
class Derived extends Base {
  greet(name?: string) { // 函数名称和参数相同
    if (name === undefined) {
      super.greet()
    } else {
      console.log(`Hello, ${name.toUpperCase()}`)
    }
  }
}
const derived = new Derived()
derived.greet('jack')   // Hello, JACK
derived.greet()         // Hello, world!



// ----------- Initialization Order -------
class BaseClass {
  name: string = 'base';
  constructor() {
    console.log(this.name)
  }
}
class BaseDerived extends BaseClass {
  name: string = 'derived';
}
const base_derived = new BaseDerived() // base


// ------------ member visibility ----------
/*
You can use TypeScript to control whether certain methods or properties are visible to code
outside the class.
*/
class GreeterClass {
  // the default visibility of class member is public. A public member can be accessed anywhere.
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  public greet() {
    console.log(`Hello, ${this.name}`)
  }
}
const greeter1 = new GreeterClass('kyrie')
greeter1.greet()  // hello, kyrie
/*
Because public is already the default visibility modifier, you do not ever need to write it on
a class member, but might choose to do so for style/readability reasons.
*/



// protected
/*
protected members are only visible to subclassed of the class they're declared in.
*/
class Reader {
  public greet() {
    console.log(`Hello, ${this.getName()}`)
  }
  protected getName() {
    return 'Irving'
  }
}
class SubReader extends Reader {
  protected name: string;
  constructor(name: string) {
    super()
    this.name = name
  }
  public hello() {
    console.log(`Hello, ${this.getName()}`)
    console.log(`Hello, ${super.getName()}`)
    console.log(this.name)  // james
  }
}
const reader = new SubReader('james')
reader.greet()  // Hello, Irving
reader.hello()  // Hello, Irving
console.log(reader['name']) // james
// reader.getName() 只能在类 或者 子类内部访问
// console.log(reader.name)  // 报错


// privated
/*
private is like protected, but doesn't allow access to the member even from subclassed.
*/
class Phone {
  private price: number;
  constructor(price: number) {
    this.price = price;
  }
  getPrice(): number {
    return this.price
  }
}
const phone = new Phone(5999)
// console.log(phone.price)    报错
console.log(phone.getPrice())  // 5999

/*
Like other aspects of TypeScript's type system, private and protected are only enforced during
type checking.

This means that JavaScript runtime constructs like in or simple property lookup can still access
a private or protected member.
*/

// ------- static members --------
class MyClass {
  static x: number = 0;
  static print() {
    console.log(MyClass.x)
  }
}
class SubClass extends MyClass {

}
console.log(MyClass.x)    // 0
MyClass.print()           // 0
console.log(SubClass.x)   // 0
SubClass.print()          // 0
