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