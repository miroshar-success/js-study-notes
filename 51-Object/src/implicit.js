console.log('--------------------- 强制类型转换 -------------------')
console.log(JSON.stringify(123))  // '123'
console.log(JSON.stringify(true)) // 'true'
console.log(JSON.stringify(undefined))  // 'undefined'
console.log(JSON.stringify(null)) // 'null'
console.log(JSON.stringify("123"))  // ""123""


const obj = {
  [Symbol(123)]: 'hello',
  b: function() {
    return 'hello'
  },
  a: undefined
}
console.log(JSON.stringify(obj))  // {}

console.log(JSON.stringify(Symbol('he'))) // undefined
console.log(JSON.stringify(function() {}))  // undefined

const player = {
  firstName: 'lebron',
  lastName: 'james',
  age: 38
}
console.log(JSON.stringify(player, null, 3))
console.log(JSON.stringify(player, null, '------'))
