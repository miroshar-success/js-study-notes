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

console.log('---------------- number ---------------')

