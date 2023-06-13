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



// ---------------- bind mdn --------------------
const m2 = {
  x: 42,
  getX: function() {
    return this.x
  }
}
const bindGetX = m2.getX.bind({x: 50})
console.log(bindGetX()) // 50

// ---------- 偏函数 ----------
function list() {
  return Array.prototype.slice.call(arguments)
}
console.log(list(1,2,3,4,5))  // [ 1, 2, 3, 4, 5 ]
console.log(list(1,2,3))      // [ 1, 2, 3 ]

const leadingThirtysevenList = list.bind(null, 37)
console.log(leadingThirtysevenList(12,23,34)) // [ 37, 12, 23, 34 ]
const leadingSeven = list.bind(null, 30)
console.log(leadingSeven(1,2,3))  // [ 30, 1, 2, 3 ]


// -------------- setTimeout ------------
function Player(name) {
  this.name = name
}
Player.prototype.say = function(){
  console.log(this.name)
}
/* Player.prototype.invoke = function(){
  window.setTimeout(this.say, 1000)
} */
Player.prototype.invoke = function(){
  window.setTimeout(() => {
    this.say()
  },1000)
}

Player.prototype.invoke = function(){
  window.setTimeout(this.say,bind(this), 1000) // 'kyrie'
}

const kyrie = new Player('kyrie')
// kyrie.invoke()

// ----------- 实现一个bind ----------
Function.prototype.myBind = function(context, ...args) {
  const self = this
  return function(...arguments) {
    const newArguments = [...args,...arguments]
    return self.apply(context, ...newArguments)
  }
}

const myList = list.bind(null, 30)
console.log(myList(1,2,4))  // [30, 1, 2, 4]


function sum(a, b, c) {
  return a + b + c
}
const s1 = sum.bind(null ,10)
console.log(s1(20, 30)) // 60
console.log(s1(30,40))  // 80
