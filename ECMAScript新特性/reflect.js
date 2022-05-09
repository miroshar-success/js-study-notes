// Reflect对象与proxy对象一样, 也是为了ES6操作对象而提供的新API.
// ----------- Reflect.get(target, name, receiver) -------
// 查找并返回target对象的name属性
const player = {
  firstName:'kyrie',
  lastName:'irving',
  age:30
}
const firstName = Reflect.get(player, 'firstName')
const lastName = Reflect.get(player, 'lastName')
const fullName = Reflect.get(player,'fullName')
console.log(firstName, lastName, fullName)  // kyrie irving undefined

console.log(player.firstName, player.lastName, player.fullName) // kyrie irving undefined

// ----------- 对象部署了 getter 函数, getter的this绑定receiver -----------
const myObject = {
  foo:1,
  bar:2,
  get baz(){
    return this.foo + this.bar
  }
}
const myReceiverObject = {
  foo:4,
  bar:4
}
console.log( 'baz:', Reflect.get(myObject, 'baz', myReceiverObject) ) // 8



// ---------------------------- Reflect.set(target, name, value, receiver) -----------------
const singer = {
  firstName: 'jay',
  lastName: 'chou',
  age: 30,
  set bar(value) {
    return this.age = value
  }
}
console.log(singer.age) // 30
console.log( Reflect.set(singer, 'age', 40) ) // true
console.log(singer.age) // 40
Reflect.set(singer,'bar', 3)
console.log(singer.age) // 3
console.log('singer', singer) // { firstName: 'jay', lastName: 'chou', age: 3, bar: [Setter] }

//------ 设置 receiver -----
const handler = {
  set(target, key, value, receiver) {
    console.log('set', target, key, value, receiver)
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty', target, key, attribute)
    Reflect.defineProperty(target, key, attribute)
  }
}
const objectProxy = new Proxy({a: 'a'}, handler)
objectProxy.a = 'A'

//----------------  Reflect.has(target, prop) ----------------
const p = {
  foo:1
}
console.log(Reflect.has(p,'foo')) // true
console.log(Reflect.has(p,'bar')) // false


// ---------------- Reflect.deleteProperty(target,prop) ------------------
const p2 = {
  foo:'foo',
  bar:'bar',
  baz:'baz'
}
console.log('p2', p2)  // { foo: 'foo', bar: 'bar', baz: 'baz' }
delete p2.foo
console.log('p2', p2)  // { bar: 'bar', baz: 'baz' }
Reflect.deleteProperty(p2, 'baz')
console.log('p2', p2) // p2 { bar: 'bar' }


// -------------- Reflect.construct ---------
function Greeting(name) {
  this.name = name
}
const instance = Reflect.construct(Greeting, ['kyrie']) //
console.log('instance', instance) // instance Greeting { name: 'kyrie' }


// --------------- Reflect.getPrototypeOf ------------------
console.log(Object.getPrototypeOf(instance) === Greeting.prototype) // true
console.log(Reflect.getPrototypeOf(instance) === Greeting.prototype)  // true


// ----------------- Reflect.setPrototypeOf ---------------------
const arrayObject = {}
Reflect.setPrototypeOf(arrayObject, Reflect.getPrototypeOf(instance))
Reflect.setPrototypeOf(arrayObject, Array.prototype)
console.log('arrayObject:', arrayObject, arrayObject.__proto__)


// ----------------- Reflect.apply(fn, thisArg, arguments) ---------------
const ages = [11, 23, 12, 23, 14, 20, 17, 29]
const youngest = Reflect.apply(Math.min, null, ages)
const oldest = Reflect.apply(Math.max, null, ages)
console.log(youngest, oldest) // 11 29

function sum() {
  return this.a + this.b + Array.from(arguments).reduce((prev,next) => prev + next, 0)
}
console.log(Reflect.apply(sum, {a:1, b:2}, [1,2,3]))  // 9


// ------------------- Reflect.defineProperty(target, propertyKey, attributes) -----------------
const target = {}
Reflect.defineProperty(target, 'now', {
  value: () => Date.now()
})
console.log('target:', target)
