class Logger {
  printName (name = 'there') {
    console.log('this:', this)  // undefined
    this.print(`Hello ${name}`)
  }
  print (text) {
    console.log(text)
  }
  // 箭头函数的this 总是指向定义时所在的对象。
  say = () => {
    console.log('say-this:', this)
    console.log('say hello')
  }
}

const logger = new Logger()
const { say } = logger
logger.printName('kyrie')
// logger.say()
say()


// 静态方法
class Foo {
  static classMethod() {
    console.log('Foo-this:', this)
    return 'Hello World';
  }
}
console.log(Foo.classMethod())

const foo = new Foo()
// foo.classMethod()  // foo.classMethod() is not a function


// 静态方法不会被实例继承, 会被子类继承
class Parent {
  static say () {
    console.log('hhhhhhhh')
  }
}
Parent.say()
const parent = new Parent()
// parent.say()  // is not a function

class Child extends Parent {

}
Child.say() // 继承父类的方法

// 目前只有静态方法 没有静态属性