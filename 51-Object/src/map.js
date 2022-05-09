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
