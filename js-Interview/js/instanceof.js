// instanceof
function Car (color) {
  this.color = color
}
const bmw = new Car('red')
console.log(bmw, bmw instanceof Car)

/**
 * book
*/
function Book (name, author) {
  this.name = name
  this.author = author
}
const book = new Book('Vue.js', 'Evan You')
console.log(book instanceof Book, book)

console.log(book.__proto__ === Book.prototype)  // true
console.log(Book.prototype.constructor === Book)  // true

// ------------- 手写instance -------------
const checkInstance = (instance, constructor) => {
  if (typeof instance !== 'object' || instance === null) return false
  if (typeof constructor !== 'function') return false
  let a = instance
  while (a) {
    if (a.__proto__ === constructor.prototype) {
      return true
    } else {
      a = a.__proto__
    }
  }
  return false
}
console.log('封装的instance:', checkInstance(book, Book))
console.log(
  checkInstance(bmw, Car), checkInstance({}, Array), checkInstance([], Array),
  checkInstance({}, Object), checkInstance('123', String), checkInstance(new String('123'), String)
)


// -------------- 复习 ------------
const isInstance = (obj, constructor) => {
  // 判断参数 必须是对象和一个函数
  if (typeof obj !== 'object' || typeof obj === null) return false
  if (typeof constructor !== 'function') {
    throw new Error('consturctor should be a function')
  }
  let instance = obj
  while (instance) {
    if (instance === constructor.prototype) {
      return true
    }
    // instance = instance.__proto__
    instance = Object.getPrototypeOf(instance)
  }
  return false
}
// 测试
function Player (name, age) {
  this.name = name
  this.age = age
}
const kyrie = new Player('kyrie', 32)
const james = new Player('lebron', 38)

console.log(isInstance(kyrie, Player), isInstance(james, Player)) // true true
console.log(isInstance(null,Player), isInstance({}, Player))  // false false
console.log(isInstance(kyrie, Object))  // true
console.log(isInstance('a12', Player))  // false