console.log('-------------------- string -------------------')
console.log((123).toString())   // '123'
console.log((true).toString())  // 'true'
console.log(String(undefined))  // 'undefined'
console.log(String(null))       // 'null'

const obj = {
  value: 123,
  toString() {
    return this.value
  }
}
console.log(obj.toString())     // 123

const player = {
  firstName: 'kyrie',
  lastName: 'irving'
}
console.log(player.toString())  // [object Object]


const a = [1, 2, 3]
console.log(a.toString())

const p = ['kyrie', 'irving']
console.log(p.toString()) // kyrie,irving


const list = [
  {
    firstName: 'kyrie',
    lastName: 'irving'
  },
  {
    firstName: 'lebron',
    lastName: 'james'
  }
]
console.log(list.toString())    // [object Object],[object Object]


const date = +new Date()
console.log(date, Date.now(), new Date().getTime())


const user = {
  name: 'kyrie',
  age: 30,
  toString() {
    return this.name
  },
  valueOf() {
    return this.age
  }
}
console.log(+user)      // 30
console.log(`${user}`)  // kyrie


const json = `{
  "firstName": "kyrie",
  "lastName": "irving",
  "teammate": {
    "firstName": "kevin",
    "lastName": "durant"
  }
}`
console.log(JSON.parse(json))
JSON.parse(json, function(k,v) {
  console.log(k, v, this)
})

const set = new Set()
const map = new Map()

set.add(1)
map.set('hello', 'world')
console.log(JSON.stringify(set), JSON.stringify(map)) // {} {}

console.log(JSON.stringify(NaN))        // null
console.log(JSON.stringify(Infinity))   // null

console.log(~42)  // 42
console.log(~-1)  // 0



const objA = {property: 'ObjectA', valueOf() {return 'hello'}}
const objB = {property: 'ObjectB', toString() {return 'world'}}

const o = {
  [objA]: 'hello',
  [objB]: 'world'
}
console.log(o)
/*
{
[object Object]: "hello"
world: "world"
}
*/

// ----------  删除原型上的属性 -------
function Player(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
const kyrie = new Player('kyrie', 'irving')
kyrie.__proto__.age = 30
console.log(kyrie)
delete kyrie.firstName;
delete kyrie.age
console.log(kyrie)
delete kyrie.__proto__.age
console.log(kyrie)

// ------- toString() ---------
const toString = Object.prototype.toString
function getObjectType(obj) {
  return toString.call(obj).slice(8, -1)
}

console.log(typeof String.prototype)          // object
console.log(getObjectType(String.prototype))  // String

console.log(typeof Boolean.prototype)         // object
console.log(getObjectType(Boolean.prototype)) // Boolean
