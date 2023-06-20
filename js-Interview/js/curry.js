// --------- 函数科里化 ------------
const sum = (a, b, c) => {
  return a + b + c
}

const curry = (fn) => {
  return function _curry(...args) {
    if (fn.length > args.length) {
      return function(...argument) {
        const newArgs = [...args, ...argument]
        return _curry(...newArgs)
      }
    }
    // const a = args.slice(0, fn.length)
    return fn(...args)
  }
}

const curry_sum = curry(sum)

console.log(curry_sum(1)(2)(3), curry_sum(1)(2, 3), curry_sum(1, 2, 3))
// 6 6 6
console.log(curry_sum(1,3)(4,5,6,7))  // 8
// console.log(curry_sum(1, 3)(4)(5)(8))