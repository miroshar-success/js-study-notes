function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype)
Baz.prototype = Object.create(Bar.prototype)

const baz = new Baz()
console.log('baz:', baz);

console.log(Baz.prototype.isPrototypeOf(baz));  // true
console.log(Bar.prototype.isPrototypeOf(baz));  // true
console.log(Foo.prototype.isPrototypeOf(baz));  // true

console.log(baz instanceof Baz) // true
console.log(baz instanceof Bar) // true
console.log(baz instanceof Foo) // true

Baz.prototype = {}
console.log(Baz.prototype.isPrototypeOf(baz)) // false
console.log(baz instanceof Baz) // false

//   demo

const p = {name:'kyrie'};
const o4 = Object.create(p);
// o4.__proto__ === p

console.log(o4 instanceof p.constructor)  // true
console.log(o4.__proto__)
console.log(p.constructor.prototype.isPrototypeOf(o4))  // true