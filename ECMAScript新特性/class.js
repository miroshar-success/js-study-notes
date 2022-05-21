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
