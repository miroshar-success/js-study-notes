// --------- 获取值的准确类型 --------
const s = '123'
const n = 123
const b = true
const f = () => {}
const r = /\d+/g;
const d = new Date()
const u = undefined
const n1 = null
const s1 = Symbol('foo')
const s2 = new Set()
const m = new Map()
const o = {a:1}
const a = [1,2,3]
const p = Promise.resolve()
const c = class Player {
  name: string
  constructor() {
    this.name = name
  }
}

console.log(typeof s) // string
console.log(typeof n) // number
console.log(typeof b) // boolean
console.log(typeof f) // function
console.log(typeof r) // object
console.log(typeof d) // object
console.log(typeof u) // undefined
console.log(typeof n1)  // object
console.log(typeof s1)  // symbol
console.log(typeof o) // object
console.log(typeof a) // object
console.log(typeof s2)  // object
console.log(typeof m) // object
console.log(typeof p)
console.log(typeof c)
// typeof 只能判断值类型， 其他就是 function / object


function getType(data:any): string { // [object ]
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}
console.log(getType(s)) // string
console.log(getType(n)) // number
console.log(getType(b)) // boolean
console.log(getType(f)) // function
console.log(getType(r)) // regexp
console.log(getType(d)) // date
console.log(getType(u)) // undefined
console.log(getType(n1))  // null
console.log(getType(s1))  // symbol
console.log(getType(o)) // object
console.log(getType(a)) // array
console.log(getType(s2))  // set
console.log(getType(m)) // map
console.log(getType(p)) // map
console.log(getType(c)) // map



// --------- 某个值 是不是指定的类型 ---------
function isType(type: string):(data: any) => boolean {
  return function(object) {
    return Object.prototype.toString.call(object) === `[object ${type}]`
  }
}
const isString = isType('String')
console.log(isString('123'))  // true
console.log(isString(123))    // false
