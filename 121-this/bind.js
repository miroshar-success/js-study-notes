function foo() {
  console.log(this.a)
}

const object = {
  a: 3
}
foo.call(object)    // 3

// ------------------------ 硬绑定 --------------------------
function baz(something) {
  console.log(this.a, something)  // 3 3
  return this.a + something;
}

const obj = {
  a: 3
}
const bar = function() {
  return baz.apply(obj, arguments)
}
const b = bar(3)
console.log(b)

// -------------- bind -----------
function f1(something) {
  console.log(this.a, something)  // 3 6
  return this.a + something;
}
const o = {
  a: 3
}
const bind_f1 = f1.bind(o, 6)
console.log(bind_f1())  // 9

// 使用bind call 或者 apply 第一个参数传递为null, 还是会绑定到全局
function m1() {
  console.log('this-m1-a:', this.a) // 10
}
var a = 10;
m1.call(null)



// -------- bind传递基本类型 --------
function fn() {
  console.log('this:', this)
}

fn.bind(1).bind(2)



// ---------- 优先级 ---------
function f2() {
  console.log(this._a)
}
const o1 = {
  _a: 10,
  f2
}
const o2 = {
  _a: 20,
  f2
}
o1.f2()   // 10
o2.f2()   // 20

o1.f2.call(o2)  // 20
o2.f2.call(o1)  // 10

// ------------------ new关键字和隐式绑定 -----------------
function f3(value) {
  this._b = value;
}
const object_1 = {
  f3
}

const object_2 = {}

object_1.f3(10)
console.log(object_1._b)  // 10

object_1.f3.call(object_2, 10)
console.log(object_2._b)  // 10

const bac = new object_1.f3(4)
console.log(object_1._b)  // 10
console.log(bac._b) // 4




