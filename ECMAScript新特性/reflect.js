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
