function sum(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}

console.log(sum(1)(2)(3))   // 6

function add(a, b, c) {
  return a + b + c
}

function curry_fn(fn) {
  const args = []
  return function currying(...args) {
    if(args.length === fn.length) return fn(...args)
    return function() {
      const arg = [...args, ...arguments]
      return currying(...arg)
    }
  }
}

const sum_1 = curry_fn(add)
console.log(sum_1(1)(2)(3)) // 6
console.log(sum_1(1,2)(3))  // 6
console.log(sum_1(1)(2, 3)) // 6


const un_currying = function(fn) {
  const _this = this
  return function() {
    const args = [...arguments]
    return fn.apply(_this, args)
  }
}

const un_sum = un_currying(sum_1)
console.log(un_sum(1,2,3))  // 6


// ------------- 计算器 ---------------
class Calculator {
  constructor(value) {
    this._value = value
  }
  add(number) {
    this._value += number
    return this
  }
  minus(number) {
    this._value -= number
    return this
  }
  divide(number) {
    this._value = this._value / number
    return this
  }
  multiple(number) {
    this._value = this._value * number;
    return this;
  }
  get value() {
    return this._value
  }
}
const calculator = new Calculator(1)
console.log(calculator.add(12).multiple(2).minus(2).divide(2).value)  // 12
console.log(new Calculator(12).multiple(2).divide(3).value) // 8
