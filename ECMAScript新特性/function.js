// -------- 函数默认值的变通方法 ----------
function log(x, y) {
  y = y || '你好'
  console.log(x, y)
}

log('hello', 'china') // hello china
log('hello', '')  // hello 你好
log('hello')  // hello 你好


// ----------------------- 函数的默认值 -------
function say(x,y = 'World'){
  console.log(`${x}-${y}`);
}
say('Hello','China')  // Hello-China
say('Hello')  // Hello-World
say('Hello', '')  // Hello-

// --------- 构造函数使用函数默认值 --------
function Point(x = 0, y = 0) {
  this.x = x
  this.y = y
}
const point = new Point()
const p1 = new Point(3)
console.log(point, p1)  // Point { x: 0, y: 0 }   Point { x: 3, y: 0 }

// --------- 参数是默认惰性求值的 -----------
let _x = 99
function print_x(y = _x + 1){
  console.log('y', y)
}
print_x() // 99
_x = 100;
print_x() // 101


// 函数的默认值与解构赋值相结合 --------------
// 如果函数没有提供参数,默认等于一个对象
function foo({x,y = 5} = {}){
  console.log(x,y)
}
foo({}) // undefined,5
foo({x:1})  // 1,5
foo({x:1,y:2})  // 1,2
foo();  // undefined 5

//------------------------ practice
// 设置了解构赋值的默认值,函数参数默认值是空对象
function m1({x = 0, y = 0} = {}){
  console.log([x,y])
}
// 没有设置解构赋值的默认值,默认值不是空对象
function m2({x,y} = {x:0,y:0}){
  console.log([x,y])
}
m1()  // 0  0
m2()  // 0  0

m1({x:3,y:8}) // 3  8
m2({x:3,y:8}) // 3  8

m1({x:3}) // 3  0
m2({x:3}) // 3  undefined

m1({})   // 0 0
m2({})   // undefined undefined

m1({z:3}) // 0 0
m2({z:3}) // undefined undefined


// -------- 参数默认值的位置-----------
// 有默认值的参数只能是最后一个参数, 如果不是最后的参数,除非显示的传递undefined
function f(x = 1, y){
  return [x, y]
}
console.log('f-result', f())  // [1,undefined]
console.log('f-result', f(2)) // [2,undefined]
// console.log('f-result', f(,1))  // 报错
console.log('f-result', f(undefined,2)) // [ 1, 2 ]


// --------- length属性 ---------
console.log((function (a){}).length)  // 1
console.log((function (a = 2){}).length)  // 0
console.log((function (a,b = 3,c){}).length) // 1
console.log((function (a, b, c =3){}).length) // 2


// -------- 作用域 --------
/*
设置了参数默认值, 函数进行初始化时,会形成一个单独的作用域, 等到初始化结束时,这个作用域就会消失。
*/
let _y = 3;
function print_argument(_y, y = _y){
  console.log(y)
}
print_argument(5) // 5


// --------- 参数默认值是函数 ----------
let _foo = 'outer'
function _bar(func = () => _foo){
  let _foo = 'inner'
  console.log(func())
}
_bar()  // outer


// ------------------ rest参数 ---------------
function add(...args){
  console.log(Array.isArray(args))  // true
  return args.reduce((prev,next) => prev + next, 0)
}
console.log(add(1,2,3,4,5,6,7,8,9,10,11,12))  // 78



function add_1(){
  console.log(Array.isArray(arguments)) // false
  console.log(arguments,Array.from(arguments)); // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 } [ 1, 2, 3, 4, 5 ]
  console.log([...arguments])   // [ 1, 2, 3, 4, 5 ]
}

let result = add(1,2,3,4,5)
console.log('sum:',result)  // 15
add_1(1,2,3,4,5)


// ------------------- 箭头函数
const f1 = () => {
  console.log('arrow-this:', this)
}
f1()

// new f1()     // f1 is not a constructor

// -------------- name 属性 ------------
const f_1 = () => {}
console.log('f1-name:', f_1.name) // f_1

const f_2 = function f_3() {}
console.log('f2_name:', f_2.name) // f_3

console.log((new Function).name)  // anonymous

const person_1 = {
  name: 'kyrie',
  getName: function() {
    return this.name
  }
}
console.log('function name:',person_1.getName.name) // getName

const person_2 = {
  name: 'kyrie'
}
person_2.getName = function() {
  return this.name
}
console.log('function name:', person_2.getName.name)  // ''


const new_function = new Function('number_1', 'number_2', 'return number_1 + number_2')
console.log(new_function(1,3), new_function.name) // 4 anonymous

const person_3 = {
  _name: 'kyrie',
  get name() {
    return this._name
  },
  set name(value) {
    this._name = value
  }
}
const descriptor = Object.getOwnPropertyDescriptor(person_3, 'name')
console.log(descriptor.get.name, descriptor.set.name) // get name, set name


const person_4 = {
  name: 'kyrie'
}
const get_name = (function getName() {
  return this.name
}).bind(person_4)
console.log(get_name.name)  // bound getName

const person_5 = {
  name: 'kyrie',
  [Symbol.for('get_name')]() {
    return this.name
  }
}
console.log(person_5[Symbol.for('get_name')]['name']) // [get_name]

// ------- this指向 -----------
var id = 21;
function foo1(){
  setTimeout(() => {
    console.log('id:', this.id) // 42
  },1000)
}
foo1.call({id:42})  // 42


function foo2(){
  setTimeout(function() {
    console.log('id:',this.id)  //21
  },1000)
}
foo2.call({id:42})

function Timer(){
  this.s1 = 0;
  this.s2 = 0;
  // 绑定的是定义时所在的作用域
  setInterval(() => {
    this.s1+=1
    console.log('arrow-function:', this)  // Timer {s1: 0, s2: 0}
  },1000)
  setInterval(function() {
    console.log('this:',this) // window
  },1000)
}
/* const timer = new Timer()

setTimeout(() => {
  console.log('s1:', timer.s1)  // 3
},3200)
setTimeout(() => {
  console.log('s2:', timer.s2)  // 0
},3200) */

//  ----------- DOM事件的this ---------
var handler = {
  id:123456,
  init: function() {
    document.addEventListener('click',event => {
      console.log('init-this:', this) // handle对象
      this.doSomething(event.type)
    },false)

    document.addEventListener('click',function(){
      console.log('this-----:', this)   // document
    })
  },
  doSomething: function(type) {
    console.log('type:',type, this.id)
  }
}
// handler.init();

// ----------- 箭头函数this ----------
function m1() {
  return () => {
    return () => {
      console.log(this.id)
    }
  }
}

const _m = m1.call({id:1})
_m.call({id:2})() //1
_m().call({id:3}) // 1
// arguments super new.target在箭头函数中不存在

//
function bar() {
  return () => {
    console.log('bar-this', this.id)
  }
}
bar().call({id:5})
const b = bar.call({id:100})
b() // 100

const _name = 'window'
const _obj = {_name: '张三'}
function log_name() {
  console.log(this)
  console.log(this._name)
}
const _person = {_name: 'person', log_name};
console.log('----------this---------');
(_person.log_name)();  // person
(1,_person.log_name)(); // undefined


// ---------- 部署管道机制 ------------(pipeline)
// ---- 将相加的结果 继续传递 -----
const pipeline = (...funcs) => v => funcs.reduce((prev,next) => next(prev), v)
const plus = x => x + x
const multiple = x => x * x;
const p_m = pipeline(plus, multiple)
console.log(p_m(5)) // 100

// --------- toString() ----------

function moon(){
  /*
  1111
  2222
  3333
  */
  console.log('hello world')
}

console.log(moon.toString())

// ------------- 尾调用 ---------
function foo1(x = 0) {
  if(x > 3) {
    return foo2(x)
  }
  return foo3(x)
}

function foo2(x) {
  return Math.pow(x,3)
}
function foo3(x) {
  return Math.pow(x,4)
}

console.log(foo1(3))  // 81
console.log(foo1(5))  // 123

// -------- demo --------
function addOne(x) {
  var one = 1
  function inner(b) {
    return b + one
  }
  return inner(x)
}

console.log(addOne(12)) // 13
/*
// 以上函数不会进行尾调用优化, 因为内层函数inner用到了外层函数 addOne 的内部变量。
*/


// ---------- 尾调用优化 （只在严格模式下开启） ---------
function factorial_1(n) {
  if(n === 1) return 1
  return n * factorial_1(n - 1)
}

console.log(factorial_1(5)) // 120
console.log(factorial_1(15))  // 1307674368000

console.log(factorial_1(100)) // 9.33262154439441e+157


function factorial_2(n, total) {
  if(n === 1) return total
  return factorial_2(n - 1, n * total)
}

console.log(factorial_2(5, 1))  // 120
console.log(factorial_2(100, 1))  // 9.332621544394418e+157


// -------- 斐波那契数列 --------
// 确保最后一步只调用自身。（把所有用到的内部变量改写成函数的参数）
function fibonacci_1(n) {
  if(n <= 1) {
    return 1
  }
  return fibonacci_1(n - 1) + fibonacci_1(n - 2)
}
console.log(fibonacci_1(10))  // 89
// console.log(fibonacci_1(100))  // 栈溢出

function fibonacci_2(n, acc1 = 1, acc2 = 2) {
  if(n <= 1) return acc2
  return fibonacci_2(n - 1, acc2, acc1 + acc2)
}
console.log(fibonacci_2(100)) // 927372692193079200000


// ------- 蹦床函数 --------
function trampoline(f) {
  while(f && f instanceof Function) {
    f = f()
  }
  return f
}

function sum(x, y) {
  if(y > 0) {
    return sum(x + 1, y-1)
  }else{
    return x
  }
}
// console.log( sum(1, 10000) ) // maximum call stack

function sum1(x, y) {
  if(y > 0) {
    return sum1.bind(null, x+1, y-1)
  }else{
    return x
  }
}

console.log(trampoline(sum1(1, 100000)))

// console.log(trampoline(sum(1,10000)))


console.log('------------------- 多重call ----------------')

function function_1() {
  console.log('function_1 this', this)
}
function function_2() {
  // function_2 this [String: 'function_2']
  console.log('function_2 this', this)
}
// 在一个对象上调用function_2方法
function_1.call.call.call(function_2, 'function_2')


// ---------------- 判断函数是否相同 --------------------
const fn_1 = function() {
  return 'hello world'
}
const fn_2 = function() {
  return 'hello world'
}
console.log(fn_1.toString() === fn_2.toString())  // true
