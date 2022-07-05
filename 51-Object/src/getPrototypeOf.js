console.log('----------------- getPrototypeOf --------------')
const obj = Object.create(null)
console.log(Object.getPrototypeOf(obj)) // null


function Player(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
const player = new Player('kyrie', 'irving')

const object = {};
object.__proto__ = player;
console.log(Object.getPrototypeOf(object))  // Player{ firstName: "kyrie", lastName: "irving"}

console.log(Object.getPrototypeOf(Object))    // ƒ () { [native code] }
console.log(Object.getPrototypeOf(Function))  // f () { [native code] }
console.log(Object.getPrototypeOf(Object) === Function.prototype) // true
