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
