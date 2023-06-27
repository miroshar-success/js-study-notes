// ----------------------- 面向对象编程 ---------------------------------
/**
 * 1. 封装性  程序以某种方式将实现的细节包装起来
 * 2. 继承性  基于原型的对象编程
 * 3. 多态性  一段代码应用于不同类型的对象时 可以有不一样的行为
*/

class Person {
  constructor(name){
    this.name = name
    this.mileage = 0
  }
}
class Walker extends Person {
  move_four_hour () {
    this.mileage += 4
  }
}
class Biker extends Person {
  move_four_hour() {
    this.mileage += 10
  }
}
class Driver extends Person {
  move_four_hour() {
    this.mileage += 50
  }
}

const log = (person) => {
  person.move_four_hour()
  console.log(person)
  /**
   *  Walker { name: 'walker', mileage: 4 }
      Biker { name: 'biker', mileage: 10 }
      Driver { name: 'driver', mileage: 50 }
  */
}
const walker = new Walker('walker')
const biker = new Biker('biker')
const driver = new Driver('driver')

log(walker)
log(biker)
log(driver)

// ------------------------ 私有属性 -----------------------------
function Counter() {
  this._val = 0
  this.current = function() {
    return this._val
  }
  this.increment = function() {
    this._val ++
    return this
  }
  this.reset = function() {
    this._val = 0
    return this
  }
  this.decrement = function() {
    this._val --
    return this
  }
}
const counter = new Counter()
console.log('initial:', counter.current())
counter.increment()
console.log('increment:', counter.current())
counter.decrement()
counter.decrement()
console.log('decrement:', counter.current())
counter.reset()
console.log('reset:', counter.current())

counter._val = 10
console.log('change', counter.current())

// ------------------- 阻止属性值被修改 ----------------------
function CounterWithPrivacy() {
  let val = 0
  this.current = function() {
    return val
  }
  this.increment = function() {
    val+=1
    return this
  }
  this.decrement = function() {
    val-=1
    return this
  }
  this.reset = function() {
    val = 0
    return this
  }
}
const counter_with_privacy = new CounterWithPrivacy()
console.log(counter_with_privacy.current(), counter_with_privacy)
counter_with_privacy.increment()
console.log('increment:', counter_with_privacy.current())
counter_with_privacy.decrement()
counter_with_privacy.decrement()
console.log('decrement:', counter_with_privacy.current())
counter_with_privacy.reset()
console.log('reset:', counter_with_privacy.current())


// -------------------- 闭包共享方法 ---------------------
const CounterWithShareMethods = (function() {
  const methods = {
    current () {
      return this._val
    },
    increment () {
      this._val += 1
      return this
    },
    reset() {
      this._val = 0
      return this
    }
  }
  return function () {
    this._val = 0
    Object.assign(this, methods)
  }
})()
const c1 = new CounterWithShareMethods()
const c2 = new CounterWithShareMethods()
console.log(c1.increment === c2.increment, c1, c2)  // true { _val: 0 } { _val: 0 }
c1.increment()
c1.increment()
console.log(c1, c2)

// ----------------------------- 开始设计模式 -----------------------------
const Validate = function() {}
Validate.prototype.checkName = function() {
  console.log('验证姓名')
  return this
}
Validate.prototype.checkEmail = function() {
  console.log('验证邮箱')
  return this
}
Validate.prototype.checkPassword = function() {
  console.log('验证密码')
  return this
}
const validate = new Validate()
validate.checkName()
validate.checkEmail()
validate.checkPassword()

// ------ 链式调用 -------
const chain_validate = new Validate()
chain_validate.checkName().checkEmail().checkPassword()

// ------------- 函数原型上添加方法 ------------------
const symbol = Symbol.for('add_method')
Function.prototype[symbol] = function(name, fn) {
  this[name] = fn
  return this
}
const methods = function() {}
methods[symbol]('checkName', () => {
  console.log('验证姓名')
  return this
})[symbol]('checkEmail', function() {
  console.log('验证邮箱')
  return this
})[symbol]('checkPassword', () => {
  console.log('验证密码')
})
console.log(methods.checkName())
console.log(methods.checkEmail())
methods.checkPassword()

// ---------------- 私有属性/私有方法/共有属性/共有方法 --------------------
/* function Book(id, name, price) {
  this.id = id
  this.name = name
  this.price = price
  let num = 1
  function increment() {
    console.log('执行了吗')
    num += 1
    console.log('num-----', num)
  }
  this.getName = function() {
    console.log('num:', num)
    return this.name
  }
  increment()
}
const book = new Book(1, '你不知道的JavaScript', 80)
// console.log('book:', book)
console.log('name:', book.getName())

const book_2 = new Book(2, '深入浅出React', 90)
// console.log('book_2', book_2)
console.log('name:', book_2.getName()) */

// ------------- 使用闭包 -----------------
const Book = (function() {
  let num = 0
  return function(id, name, price) {
    this.id = id
    this.name = name
    this.price = price
    num += 1
    this.getName = function() {
      console.log(num)
      return this.name
    }
  }
})()
const book = new Book(1, '你不知道的JavaScript', 100)
console.log(book.getName())
const book_2 = new Book(2, '深入浅出Redux', 90)
console.log(book.getName())


// ---------------- 防止未通过new调用 ------------------------
function Player(firstName, lastName) {
/*   if (new.target !== Player) {
    return new Player(firstName, lastName)
  } */
  if (!(this instanceof Player)) {
    return new Player(firstName, lastName)
  }
  this.firstName = firstName
  this.lastName = lastName
}
const kyrie = new Player('kyrie', 'irving')
const wade = Player('dwyane', 'wade')
console.log(kyrie, wade)