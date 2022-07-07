console.log('--------------------- seal ------------------')
const kyrie = Object.seal({
  firstName: 'kyrie',
  lastName: 'irving'
})
console.log(kyrie)

const irving = {
  firstName: 'kyrie',
  lastName: 'irving'
}
console.log(irving)

kyrie.age = 30
irving.age = 30
console.log(kyrie, irving)
/*
kyrie:  {firstName: 'kyrie', lastName: 'irving'}
irving: {firstName: 'kyrie', lastName: 'irving', age: 30}
*/

console.log(Object.getOwnPropertyDescriptors(kyrie))
/*
{
  firstName: {
    configurable: false
    enumerable: true
    value: "kyrie"
    writable: true
  }
  lastName: {
    configurable: false
    enumerable: true
    value: "irving"
    writable: true
  }
}
*/
delete kyrie.firstName
console.log(kyrie) /* {firstName: 'kyrie', lastName: 'irving'} */
kyrie.firstName = 'Kyrie'
kyrie.lastName = 'Irving'
console.log(kyrie)  // {firstName: 'Kyrie', lastName: 'Irving'}
// Cannot define property age, object is not extensible
/* Object.defineProperty(kyrie, 'age', {
  value: 30
}) */

const lebron = {}
Object.defineProperty(lebron, 'firstName', {
  value: 'lebron',
  configurable: true,
  writable: false,
  enumerable: true
})
Object.defineProperty(lebron, 'lastName', {
  value: 'james',
  configurable: true,
  writable: true,
  enumerable: true
})

Object.seal(lebron)

lebron.firstName = 'Lebron'
lebron.lastName = 'James'
// 因为 firstName 原来是不可写的
console.log(lebron) // {firstName: 'lebron', lastName: 'James'}
