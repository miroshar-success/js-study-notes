// -------- 类型断言 -------
// 1. 重叠关系 ---- A类继承为B类
class People {
  public name: string
  public age: number
  constructor(name: string, age: number) {
    this.age = age
    this.name = name;
  }
  say() {
    console.log('hello')
  }
}
class Student extends People {
  constructor(name: string, age: number) {
    super(name, age)
  }
  study() {
    console.log('study')
  }
}
const people = new People('kyrie', 32)
const study = people as Student;
// study 有 name age say study

const student = new Student('lebron', 37)
const result = student as People;
// result 有 name age say



// 2. 两个没有继承关系的类
/*
判断两个类的共有属性和公共方法是否完全相同 或者 其中一个类是另一个类的子集
*/
class ClassA {
  public firstName: string
  public lastName: string
  public age: number
  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }
  public fullName() {
    return this.firstName + this.lastName
  }
}
class ClassB {
  public firstName: string
  public lastName: string
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
  }
}

const classA = new ClassA('kyrie', 'irving', 30)
const classB = new ClassB('lebron', 'james')

const transformA = classA as ClassB
console.log(transformA.firstName, transformA.lastName)

const transformB = classB as ClassA;
console.log(transformB.firstName, transformB.lastName, transformB.fullName(), transformB.age)


// 3. A 是一个类， B 是一个接口
class Person {
  public name: string
  public age: number
  public sex: number
  constructor(name:string, age: number, sex: number = 0) {
    this.name = name
    this.age = age
    this.sex = 1
  }
}

interface PersonProps {
  name: string
  age: number
}
const person1: PersonProps = {
  name: 'hello',
  age: 20,
} as Person
console.log(person1.age, person1.name)

const person2 = new Person('hello', 20) as PersonProps
console.log(person2.age, person2.name)


// 3. 函数的参数是联合类型
function get_length(a: number | string) : number {
  return (a as string).length
}

export {
}
