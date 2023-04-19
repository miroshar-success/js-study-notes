/* class Student {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say () {
    console.log(`${this.name} - ${this.age}`)
  }
}
const kyrie = new Student('kyrie', 30)
const james = new Student('lebron', 38)

console.log(kyrie, james)

kyrie.say()
kyrie.age = 31
james.say() */

class Person {
  constructor(name, age) {
    this.age = age
    this.name = name
  }
  say () {
    console.log(`My name is ${this.name}, my age is ${this.age}`)
  }
}

const person = new Person('王二', 30)

class Student extends Person {
  constructor(name, age, subjects) {
    super(name, age)
    this.subjects = subjects
  }
  skill () {
    console.log('I can study!', this.subjects)
  }
}

const student_1 = new Student('张三', 10, ['语文', '数学'])
const student_2 = new Student('李四', 12, ['英语', '历史'])

student_1.say()
student_2.say()
student_1.subjects[1] = '政治'
console.log(student_1, student_2, person, student_1)
person.say()

student_1.skill()
student_2.skill()
console.log(typeof Student)

// ------------- 构造函数 ---------------
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'green', 'blue']
}
Parent.prototype.say = function() {
  console.log(this.name, 'color:', this.colors)
}
function Child (name) {
  this.name = name
}
Child.prototype = new Parent()
console.log(Child.prototype.__proto__ === Parent.prototype) // true
console.log(Child.prototype.__proto__.constructor)
const child_1 = new Child('child1')
const child_2 = new Child('child2')

console.log(child_1, child_2)

child_1.colors.pop()
child_1.say()
child_2.say()

// 构造函数继承
function Father(name, age) {
  this.name = name
  this.age = age
  this.colors = ['red', 'blue', 'green']
}
Father.prototype.say = function() {
  console.log(`${this.name} ---- ${this.age}`)
}

function Son(name, age) {
  Father.call(this, name, age)
  Object.setPrototypeOf(Son.prototype, Father.prototype)
}
const s1 = new Son('儿子1', 20)
const s2 = new Son('儿子2', 12)
console.log(s1, s2)
s1.colors.pop()
s2.colors.push('pink')
console.log(s1, s2)
s1.say()  // s1.say is not a function

const { name, age, colors, say } = s1
console.log(name, age ,colors, say)

const { ...copy_son } = s1
console.log(copy_son)