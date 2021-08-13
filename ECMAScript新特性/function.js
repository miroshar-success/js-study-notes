// ----------------------- 函数的默认值
function say(x,y = 'World'){
  console.log(`${x}-${y}`);
}
say('Hello','China')
say('Hello')


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
// 设置了解构赋值的默认值,函数参数默认值是控对象
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



// ------------------ rest参数
function add(...args){
  console.log(Array.isArray(args))  // true
  return args.reduce((prev,next) => prev + next, 0)
}

function add_1(){
  console.log(Array.isArray(arguments)) // false
  console.log(arguments,Array.from(arguments));
  console.log([...arguments])
} 

let result = add(1,2,3,4,5) 
console.log('sum:',result)  // 15
add_1(1,2,3,4,5)


// ------------------- 箭头函数
const f1 = () => {
  // console.log(arguments)
  console.log('arrow-this:', this)
}
f1()

// new f1()     // f1 is not a constructor


// ------------------------------- this指向
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
  setTimeout(() => {
    console.log('arrow-function:', this)
  },0)
  setTimeout(function() {
    console.log('this:',this)
  },0)
}
const timer = new Timer()
console.log('timer:', timer)

// DOM事件的this
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
handler.init();


// 
function bar() {
  return () => {
    console.log('bar-this', this.id)
  }
}
bar().call({id:5})
const b = bar.call({id:100})
b() // 100
