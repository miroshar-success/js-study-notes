// ------------- this 指向 ---------------
function identify() {
  return this.name.toUpperCase()
}
function speak() {
  var greeting = 'Hello, I am ' + identify.call(this)
  console.log(greeting)
}

const me = {
  name: 'kyrie'
}
const you = {
  name: 'reader'
}
console.log( identify.call( me ) )    // KYRIE
console.log( identify.call( speak ) ) // SPEAK

speak.call(me)
speak.call(you)

// ------------------- 对函数理解对误区 --------------
function foo(number){
  console.log('foo------', number)
  this.count += 1;
}
foo.count = 0;
for(let i = 0; i < 3; i++){
  foo(i)
}
console.log(foo.count)  // 0


// ---------- 对上面例子改写 -------
for(let i = 0; i < 3; i++) {
  foo.call(foo,i)
}
console.log(foo.count)  // 3

// ------------ 对象属性引用链中只有最顶层 会影响调用位置 -------------
function bar() {
  console.log('b:', this.b)
}
var obj2 = {
  b: 100,
  bar
}
var obj1 = {
  b:10,
  obj2
}
obj1.obj2.bar() // 100


// ------------ 隐式丢失 ----------
function m1() {
  console.log(this.c)
}
const object = {
  c: 2,
  m1
}
const baz = object.m1;
var c = 'oops global';
baz()


// ----------------- ---------------
function m2() {
  console.log(this.d)
}
function doFoo(fn) {
  fn()
}

const o1 = {
  d: 2,
  m2
}
var d = 'oops global';
doFoo(o1.foo) // oops global

// -------------- 给内置函数 传递函数 ---------------
function m2() {
  console.log(this.z)
}
const object3 = {
  a:100,
  m2
}
var z = 'oops global';
setTimeout(object3.m2, 100) // oops global













