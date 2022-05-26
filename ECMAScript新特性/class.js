class Person {
  constructor(name) {
    this.name = name;
  }
  static hello() {
    console.log('hello')
  }
  say() {
    console.log(`Hi, my name is ${this.name}`)
  }
}
// Student 继承自 Person.
class Student extends Person{
  constructor(name,number){
    // 在使用this之前必须使用super
    super(name)
    this.number = number;
  }
}
const student = new Student('kyrie')
console.log('student:',student, Student)
Student.hello() // 继承自父组件的静态方法
student.say()

// ----------- class --------------
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return this.x + '-' + this.y
  }
}
console.log(typeof Point, Point.prototype.constructor === Point)  // function true
const point = new Point(1, 3)
console.log(point.toString()) // 1-3

/*
  1.  类的内部所定义的方法, 都是不可枚举的
  2.  这些方法都是不可枚举的
 */
console.log(Object.keys(Point.prototype))   // []
console.log(Object.getOwnPropertyNames(Point.prototype))  // [ 'constructor', 'toString' ]
console.log(Object.getOwnPropertyDescriptors(Point.prototype))
/*
{
  constructor: {
    value: [class Point],
    writable: true,
    enumerable: false,
    configurable: true
  },
  toString: {
    value: [Function: toString],
    writable: true,
    enumerable: false,
    configurable: true
  }
}
*/

// --------- 类的实例 ---------
console.log(point.hasOwnProperty('x'))        // true
console.log(point.hasOwnProperty('y'))        // true
console.log(point.hasOwnProperty('toString')) // false

const p1 = new Point(1,2)
const p2 = new Point(1,3)
console.log(p1.__proto__ === p2.__proto__)    // true

console.log(Point.name)   // Point


// ------------- 静态方法 -----------------
class Foo {
  static classMethod() {
    return 'hello'
  }
  static bar() {
    this.baz()
  }
  static baz(){
    console.log('static baz')
  }
  baz(){
    console.log('instance baz')
  }
}
console.log(Foo.classMethod())      // hello
Foo.bar()                           // static baz

class IncreasingCounter {
  constructor() {
    this._count = 0
  }
  get value() {
    return this._count
  }
  increment() {
    this._count += 1
  }
}
const counter = new IncreasingCounter()
counter.increment()
counter.increment()
counter.increment()
console.log(counter.value)              // 3


// ---------- extends ------------
class ColorPoint extends Point {
  constructor(x,y,color) {
    super(x, y)
    this.color = color
  }
  toString() {
    return this.color + '' + super.toString()
  }
}
const cp1 = new ColorPoint(1, 2, 'red')
const cp2 = new ColorPoint(2, 3, 'blue')
console.log(cp1.toString(), cp2.toString()) // red1-2 blue2-3
/*
ES6规定, 子类必须在constructor()方法中调用super(), 否则就会报错. 这是因为子类自己的this对象, 必须先通过父类的构造函数
完成塑造, 得到与父类同样的实例属性和方法, 然后再对其进行加工, 添加子类的实例属性和方法。
*/


// ------- 构造函数继承 --------
function Father(name, age) {
  this.name = name;
  this.age = age;
  this.colors = ['red', 'green', 'blue']
}
Father.prototype.say = function() {
  console.log(`My name is ${this.name}, and I am ${this.age} years old`)
}

function Child(name, age) {
  Father.call(this, name, age)
}
function extend(s) {
  const obj = {}
  Object.setPrototypeOf(obj, s.prototype)
  return obj
}
Object.setPrototypeOf(Child.prototype, Father.prototype)
const father = new Father('lebron', 40)
const child = new Child('kyrie', 20)
father.say()  // My name is lebron, and I am 40 years old
child.say() // My name is kyrie, and I am 20 years old

console.log(father.colors)  // [ 'red', 'green', 'blue' ]
child.colors.pop()
console.log(father.colors)  // [ 'red', 'green', 'blue' ]
console.log(child.colors)   // [ 'red', 'green' ]

// --------- 静态属性和方法 ----------
function People(name, age) {
  this.name = name;
  this.age = age;
}
People.fullName = 'hello'
People.say = function() {
  return 'hello'
}
for(const key in People) {
  if(Object.prototype.hasOwnProperty.call(People, key)) {
    console.log('people-key', key)  // fullName, say
  }
}

console.log({__proto__: []} instanceof Array) // true
console.log([] instanceof Array)  // true
