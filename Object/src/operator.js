console.log('----------------- 运算符 -------------')

const array = [1, 2, 3], boolean = false;
const date = new Date()
const fn = function() {}
const number = 123
const string = '123'
const object = {msg: 'hello world'}

console.log(array.valueOf(), array.valueOf() === array) // [1, 2, 3]  true
console.log(boolean.valueOf(), boolean.valueOf() === boolean) // false true
console.log(date.valueOf()) // 1656855031156
console.log(fn.valueOf(), fn.valueOf() === fn)  // ƒ () {} true
console.log(number.valueOf(), number.valueOf() === number)  // 123 true
console.log(string.valueOf(), string.valueOf() === string)  // 123 true
console.log(object.valueOf(), object.valueOf() === object)  // {msg: 'hello world'} true


const a = {
  valueOf() {
    return '42'
  }
}
const b = {
  toString () {
    return '42'
  }
}
const c = [3, 4]
c.toString = function() {
  return c.join('')
}
console.log(Number(a), Number(b), Number(c))  //42, 42, 34
console.log(Number([])) //0
console.log(Number('')) // 0
console.log(Number('abc'))  // NaN
console.log(Number(NaN))  // NaN
console.log(Number(undefined))  // NaN
console.log(Number([1,2,3]))  // NaN
console.log(Number(null))
console.log(Number({})) // NaN


const player = {
  [Symbol.toPrimitive](hint) {
    console.log(hint)
    if(hint === 'number') return 10
    if(hint === 'string') return 'hello'
    return true
  }
}
console.log(`${player}`)  // hello
console.log(player+'')    // true
console.log(+player)      // 10

console.log(typeof player[Symbol.toPrimitive])  // function
console.log(typeof ({})[Symbol.toPrimitive])  // undefined
console.log(typeof ([])[Symbol.toPrimitive])  // undefined
console.log(typeof ('123')[Symbol.toPrimitive])


console.log([] + [])  // ''
console.log([] + {})  // '[object Object]'
console.log({} + [])  //
