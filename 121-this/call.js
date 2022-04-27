const numbers = [1,2,3,4,5]
console.log(Math.max.call(null, ...numbers))  // 5
console.log(Math.min.call(null, ...numbers))  // 1


const array = ['a', 'b', 'c']
const elements = [0, 1, 2]
array.push.apply(array, elements) // [ 'a', 'b', 'c', 0, 1, 2 ]
console.log(array)

array.push(...elements)
console.log(array)  // [ 'a', 'b', 'c', 0, 1, 2,   0,   1,   2]

let max = -Infinity, min = Infinity;
numbers.forEach(item => {
  if(item > max) {
    max = item
  }
  if(item < min) {
    min = item
  }
})
console.log(max, min) // 5  1



// ----------------- 手写实现 -----------------
Function.prototype.myApply = function(context, args) {
  if(context === null || context === undefined) context = globalThis
  if(! typeof context !== 'object') context = Object(context)
  const fnKey = Symbol()
  context[fnKey] = this
  const result = context[fnKey](...args)
  delete context[fnKey]
  return result
}

console.log(Math.min.myApply(null, numbers))
console.log(Math.max.myApply(null, numbers))
