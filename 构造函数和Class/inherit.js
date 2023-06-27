// ------------------- 继承 -------------------
// 1. 原型继承
function Person() {
  this.isPerson = true
}
Person.prototype.say = function() {
  console.log(`My name is ${this.name}`)
}

function Player(name, age) {
  this.name = name
  this.age = age
}
Player.prototype = new Person()
Player.prototype.constructor = Player
const kyrie = new Player('kyrie', 32)
kyrie.say()       // My name is kyrie
console.log(kyrie.isPerson, kyrie instanceof Player, kyrie instanceof Person) // true true true

// 缺点：1. 不方便给父构造函数传递参数 2. 会修改继承自到的共有属性
function Color() {
  this.colors = ['red', 'blue', 'green']
}
function SubColor() {}
SubColor.prototype = new Color()
SubColor.prototype.constructor = SubColor
SubColor.prototype.getColors = function() {
  console.log(this.colors)
}
const color1 = new SubColor()
const color2 = new SubColor()
color1.getColors()  // ['red', 'blue', 'green']
color2.getColors()  // ['red', 'blue', 'green']

color1.colors.push('black') // color1给colors添加一个黑色, color2也被修改了。
color2.getColors()  // ['red', 'blue', 'green', 'black']


// ------------------- 构造函数继承 --------------------
function Book(id) {
  this.id = id
  this.books = ['你不知道的JavaScript', '深入浅出Node.js']
}
Book.prototype.showBooks = function() {
  console.log(this.books.toString())
}
function SubBooks(id) {
  Book.call(this, id)
}
const sub1 = new SubBooks(1)
const sub2 = new SubBooks(2)
console.log(sub1.books, sub2.books)
// ['你不知道的JavaScript', '深入浅出Node.js']  [ '你不知道的JavaScript', '深入浅出Node.js']
sub1.books.push('图解HTTP')
console.log(sub1.books, sub2.books)
// [ '你不知道的JavaScript', '深入浅出Node.js', '图解HTTP' ]
// [ '你不知道的JavaScript', '深入浅出Node.js' ]

// 缺点： 无法继承父类原型上的方法
// sub1.showBooks()  // sub1.showBooks is not a function


// ------------------------- 组合继承 ---------------------------
function SuperClass(name) {
  this.name = name
  this.languages = ['html', 'css']
}
SuperClass.prototype.getLanguages = function() {
  return this.languages.toString()
}

function SubClass(name) {
  SuperClass.call(this, name)
}
Object.setPrototypeOf(SubClass.prototype, SuperClass.prototype)

const c_1 = new SubClass('subclass1')
const c_2 = new SubClass('subclass2')
c_1.languages.push('javascript')
console.log(c_1.languages, c_2.languages)
// ['html', 'css', 'javascript']    [ 'html', 'css' ]

console.log(c_1.getLanguages(), c_2.getLanguages())
// html,css,javascript            html,css