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