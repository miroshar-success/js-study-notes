// ----------- 构造函数和静态属性 -----------
function Player(name) {
  this.name = name;
  if(!Player.count) {
    Player.count = 0;
  }
  Player.count += 1;
}

const kyrie = new Player('kyrie')
console.log(Player.count) // 1
const lebron = new Player('lebron')
console.log(Player.count) // 2

console.log(kyrie, lebron)  // {name:'kyrie'} {name:'lebron'}


// ----------- 判断是不是通过new 调用的 ----------
function Vue(options = {}){
  this.options = options
  console.log(this)
  console.log(this instanceof Vue)
}
Vue({}) // false
new Vue({}) // true



// ------------ 判断是不是在重复创建函数------------
function Car(color) {
  this.color = color;
  this.start = function(){

  }
}
Car.prototype.run = function(){}
const c1 = new Car('red')
const c2 = new Car('blue')
console.log(c1.start === c2.start)  // false;

console.log(c1.run === c2.run)  // true
// 构造函数
console.log(c1.constructor, c2.constructor) // [Function: Car]


// --------- 在原型链上添加方法或属性 ---------
function Singer(name){
  this.name = name
}
Singer.prototype = {
  say(){}
}

const singer = new Singer('jay')
console.log(singer, singer.__proto__, Singer.prototype.constructor)
// {name:'jay'}     { say: [Function: say] }    [Function: Object]
console.log(singer.__proto__ === Singer.prototype, Singer.prototype)  // true


// --------- 构造函数返回值 --------
/*
1. 如果没有显示的返回值, 返回this
2. 如果返回的是普通类型, 返回this
3. 如果返回一个对象, 则返回一个对象
*/
function F1(){
  this.name = 'f1'
}
function F2(){
  this.name = 'f2'
  return 123
}
function F3(){
  this.name = 'f3'
  return {
    message:'hello world'
  }
}
function F4(){
  this.name = 'f4'
  return '123'
}
function F5(){
  this.name = 'f5'
  return true
}
function F6(){
  this.name = 'f6'
  return [1,2,3]
}
const f1 = new F1()
const f2 = new F2()
const f3 = new F3()
const f4 = new F4()
const f5 = new F5()
const f6 = new F6()
console.log(f1, f2, f3, f4, f5, f6)
// {name:'f1'}  // {name:'f2'}  {message:'hello world'}   {name:'f4'}    {name:'f5'}  [1,2,3]


// ---------- 实现一个new -------------
/*
1. 创建一个对象
2. 将对象的__proto__ 指向构造函数的prototype, 即object.__proto__ == constructorFunction.prototype
3. 将this值绑定到新对象
4. 返回值
*/

function Animal(name){
  this.name = name;
}

function createObject(){
  const object = new Object();
  const constructorFunction = [].shift.call(arguments)  // 获取构造函数
  object.__proto__ = constructorFunction.prototype;
  const newObject = constructorFunction.apply(object,arguments) // newObject构造函数的返回值。
  console.log('newObject:',newObject) // undefined
  return typeof newObject === 'object' ? newObject : object;
}

const animal = createObject(Animal, 'monkey')
console.log('animal', animal)


// ---------------- 一个demo --------------
function Range(from, to) {
  this.from = from;
  this.to = to;
}
Range.prototype.includes = function(x){
  return this.from <= x && this.to >= x;
}
Range.prototype.foreach = function(f){
  for(let i =  Math.ceil(this.from); i <= this.to; i++){
    f(i)
  }
}
Range.prototype.toString = function(){
  return '(' + this.from + '...' + this.to + ')';
}

const range_1 = new Range(1.3, 8)
const range_2 = new Range(3,6)
console.log(range_1.includes(12), range_1.includes(5))  // false true
range_2.foreach(console.log)  // 3 4 5 6
console.log(range_1.toString()) // 1.3 ... 8



function D(){
}
console.log('d.prototype:', D.prototype)
console.log(Object.getOwnPropertyNames(D.prototype))  // ['constructor']
console.log(Object.getOwnPropertyDescriptor(D.prototype,'constructor'))
/*
{
  value: [Function: D],
  writable: true,
  enumerable: false,
  configurable: true
}
*/


// -------------- 箭头函数不能用作构造函数 ------------
const ArrowFunction = (name) => {
  this.name = name;
}
// const arrow = new ArrowFunction()
// console.log('arrow', arrow) // ArrowFunction is not a constructor


// ---------- function.prototype 可以被for...in遍历 -----------
function Bar(){
  this.name = 'bar'
}
Bar.prototype.say = function() {}
const bar = new Bar()
console.log(bar instanceof Bar)
for(let key in bar){
  console.log('bar-key', key) // name say
}
Object.defineProperty(Bar.prototype, 'skill', {
  value:function(){
    console.log('hello')
  }
})
// skill 是不可枚举属性
for(let key in bar){
  console.log('bar-key', key) // name say
}

console.log(Bar.prototype.isPrototypeOf(bar)) // true



// ---------- 构造函数名字 ----------
Function.prototype.getName = function() {
  if('name' in this) return this.name;
  return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
}
const Complex = function(x,y){
  this.x = x
  this.y = y;
}
const complex = new Complex(1,2)
console.log(complex.__proto__.constructor)
console.log(Complex.getName())  // Complex
