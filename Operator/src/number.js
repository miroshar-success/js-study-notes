console.log('---------------- number ---------------')
const a = {
  toString() {
    return 12
  },
  valueOf() {
    return 34
  },
  [Symbol.toPrimitive]() {
    return 56
  }
}
console.log(Number(a))  // 56

const b = {
  toString() {
    return 12
  },
  valueOf() {
    return 34
  }
}
console.log(Number(b))          // 34
console.log(Number([]))         // 0
console.log(Number(undefined))  // NaN
console.log(Number(null))       // 0
console.log(Number({}))         // NaN
console.log(Number('123'))      // 123
console.log(Number(true))       // 1
console.log(Number(false))      // 0
console.log(Number([1,2,3]))    // NaN
console.log(Number([1]))        // 1
console.log(Number(['1']))      // 1
console.log(Number(['abc']))    // NaN

const obj = {
  value: 10,
  value() {
    return this;
  },
  toString() {
    return this;
  }
}
console.log(obj.toString())
// console.log(Number(obj)) // 报错

const c = {
  toString() {
    return 12
  },
  valueOf() {
    return 34
  }
}
console.log(Number(c))  // 34


const d = new Date()
console.log(+d) // 1657029251856  返回当前的时间戳

const s = '3.14'
console.log(+s) // 3.14
