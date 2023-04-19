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
  let flag = false
  while (a) {
    if (a.__proto__ === constructor.prototype) {
      flag = true
      break
    } else {
      a = a.__proto__
    }
  }
  return flag
}
console.log('封装的instance:', checkInstance(book, Book))
console.log(
  checkInstance(bmw, Car), checkInstance({}, Array), checkInstance([], Array),
  checkInstance({}, Object), checkInstance('123', String), checkInstance(new String('123'), String)
)