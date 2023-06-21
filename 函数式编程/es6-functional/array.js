// ----------------- map ------------------
Array.prototype._map = function (fn) {
  const array = this
  const list = []
  for (let i = 0, length = array.length; i < length; i++) {
    const item = array[i]
    const result = fn(item, i, array)
    list.push(result)
  }
  return list
}

// -------- 测试 ----------
console.log(([1, 2, 3, 4])._map((item, i, array) => {
  console.log(`${i} - ${item} - ${array}`)
  return Math.pow(item, 2)
}))
// [ 1, 4, 9, 16 ]

console.log((['hello', 'world'])._map(item => item.toUpperCase())) // [ 'HELLO', 'WORLD' ]

// -------------------- filter ----------------------
Array.prototype._filter = function(fn) {
  const array = this
  const list = []
  for (let i = 0, length = array.length; i < length; i++) {
    const item = array[i]
    const result = fn(item, i, array)
    result && list.push(item)
  }
  return list
}

// -------- 测试 -----------
console.log([1, 2, 3, 4, 5, 6]._filter(item => item % 2 === 0))
// [2, 4, 6]

const books = [
  { name: '深入浅出Node.js', rate: 4.9 },
  { name: '图解HTTP', rate: 5 },
  { name: '你好世界', rate: 2 },
  { name: 'hello world', rate: 2.5}
]
console.log(books._filter(item => item.rate > 4.5))
// [{ name: '深入浅出Node.js', rate: 4.9 }, { name: '图解HTTP', rate: 5 }]


// ------------------- reduce -------------------
Array.prototype._reduce = function(callback, initialValue) {
  const array = this
  let accumlator = initialValue === undefined ? array[0] : initialValue
  const start = initialValue === undefined ? 1 : 0
  for (let i = start, length = array.length; i < length; i++) {
    const item = array[i]
    accumlator = callback(accumlator, item, i, array)
  }
  return accumlator
}
// ------------- 测试 --------------
console.log([1, 2, 3, 4, 5]._reduce((prev, next) => prev + next)) // 15
console.log([1, 2, 3, 4, 5]._reduce((prev, next) => prev + next, 0)) // 15

const lists = [[1, 2, 3], [4, 5], [6, 7, 8]]
console.log(lists._reduce((prev, next) => prev.concat(...next))) // [ 1, 2, 3, 4, 5, 6, 7, 8]
