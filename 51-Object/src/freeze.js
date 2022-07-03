console.log('--------------------- freeze -----------------')
const player = Object.freeze({
  firstName: 'lebron',
  lastName: 'james',
  age: {
    last_year: 37,
    this_year: 38
  }
})

player.firstName = 'lebron'
player.age = 38
delete player.lastName
console.log(player)   // {firstName: 'lebron', lastName: 'james'}

/* Object.defineProperty(player, 'firstName', {  // Cannot redefine property: firstName
  configurable: false,
  writable: false,
  enumerable: false,
  value: 'Lebron'
})
 */

 // 如果一个属性值是对象, 则这个对象中的属性是可以修改的
player.age.last_year = 38,
player.age.this_year = 39
console.log(player)
/*
{
  age: {
    last_year: 38,
    this_year: 39
  },
  firstName: "lebron"
  lastName: "james"
}
*/


const obj = {
  firstName: 'hello',
  [Symbol.toStringTag]: 'world'
}
console.log(Object.prototype.toString.call(obj))  // [object world]
