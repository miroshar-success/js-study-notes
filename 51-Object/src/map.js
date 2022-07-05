console.log('--------------------- 遍历 ----------------------')
function Player(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
  this[Symbol('fullName')] = this.firstName + this.lastName
}
Player.prototype.say = function() {
  console.log(this.firstName + '-' + this.lastName)
}
const player = new Player('kyrie', 'irving')

Object.defineProperty(player, 'age', {
  value: 30,
  enumerable: false
})
console.log(player)
player.say()


for(const key in player){
  console.log('key', key, 'value', player[key])
}
/*
key firstName value kyrie
key lastName value irving
key say value ƒ () {
  console.log(this.firstName + '-' + this.lastName)
}
*/



console.log(Object.keys(player))
// ['firstName', 'lastName']

console.log(Object.getOwnPropertyNames(player))
// ['firstName', 'lastName', 'age']


console.log(Object.getOwnPropertySymbols(player))
// [Symbol(fullName)]

console.log(Reflect.ownKeys(player))
//  ['firstName', 'lastName', 'age', Symbol(fullName)]

const object = {
  firstName: 'kyrie',
  [Symbol('lastName')]: 'irving'
}
Object.defineProperty(object, 'age', {
  value: 30,
  enumerable: false,
  writable: true,
  configurable: true
})
object.__proto__.skill = 'crossover'
console.log('player', object)

for(const key in object) {
  console.log('for---in', key)  // firstName, skill
}
for(const key of Object.keys(object)) {
  console.log('Object.key---', key) // firstName
}
console.log(Object.getOwnPropertyNames(object)) // ['firstName', 'age']
console.log(Object.getOwnPropertySymbols(object)) // [Symbol(lastName)]

console.log(Reflect.ownKeys(object))  //  ['firstName', 'lastName', 'age', Symbol(fullName)]

function log_property(object) {
  if(object === null) return []
  const temp = []
  for(const key of Reflect.ownKeys(object)) {
    temp.push(key)
  }
  return log_property(Object.getPrototypeOf(object)).concat(temp)
}
console.log(log_property(object))


function log_property_2(object) {
  if(object === null) return
  const temp = []
  let proto = object.__proto__
  while(proto) {
    temp.push(...Reflect.ownKeys(proto))
    proto = proto.__proto__
  }
  return temp
}
console.log(log_property_2(object))


const proto = {
  name: 'p_parent',
  type: 'p_object',
  [Symbol.for('address')]: 'earth'
}
const ins = Object.create(proto)
Object.defineProperty(ins, 'age', {
  value: 18
})
ins.sex = 1
ins[Symbol.for('say')] = function() {
  console.log('say')
}
const inKeys = []
for(const property in ins) {
  inKeys.push(property)
}
console.log('inKeys:',inKeys) // ['sex', 'name', 'type']
console.log(Reflect.ownKeys(ins)) // ['age', 'sex', Symbol(say)]
