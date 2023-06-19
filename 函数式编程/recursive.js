// ----------------- 递归 ------------------
const sum = (n) => {
  if (n === 1) return 1
  return n + sum (n - 1)
}
console.log(sum(10), sum(100))  // 55 5050
// console.log(sum(100**8))        //  Maximum call stack size exceeded

// --------- 间接递归 ------------
function isEven (num) {
  if (num === 0) return true
  return isOdd(num - 1)
}
function isOdd (num) {
  if (num === 0) return false
  return isEven(num - 1)
}
console.info(isEven(11), isEven(10))  // false  true
console.info(isOdd(11), isOdd(10))  // true false

// ---------- 尾递归 ---------------
/**
 * 函数调用属于尾部调用的首要条件是位于return语句。
 * return 后面可以跟任何表达式， 表达式的返回值就是函数调用的返回值。并且未对其做任何计算。
 * 怎样算尾递归
 * 1. return (fn(), g())      // g() 属于尾部调用
 * 2. return x ? f() : g()    // f()和g()都属于尾调用
 * 3. return f() || g()       // g()是尾部调用 (第一个操作数并不是直接被返回,而是先利用其做了某些计算)
 * 4. return f() && g()       // g()是尾部调用
 * 
*/

// ------------- 尾递归优化 -------------------
function fibonacci (n) {
  if (n <= 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}
// console.log(fibonacci(40))  // 165580141   很慢
// console.log(fibonacci(45))

function fibonacci_2 (n, n1 = 1, n2 = 1) {
  if (n <= 1) return n2
  return fibonacci_2(n - 1, n2, n1 + n2)
}
console.log('fibonacci_2:', fibonacci_2(1000))

// --------------- 使用循环 -------------------
function fibonacci_3 (n) {
  if (n < 2) return n;
  let a = 0, b = 1, c = 1;
  for (let i = 2; i <= n; i++) {
    c = a + b
    a = b
    b = c
  }
  return c
}
console.log('fibonacci_3:', fibonacci_3(1001))

// ------ 阶层 ------------
function stratum(n) {
  if (n <= 1) return n
  return stratum(n - 1) * n
}
console.time('start')
console.log(stratum(170))
console.timeEnd('start')

// 快一些
function stratum_2(n, total = 1) {
  if (n <= 1) return total
  return stratum_2(n - 1, n * total)
}

console.time('start')
console.log(stratum_2(170))
console.timeEnd('start')

function totalizer(n) {
  if (n <= 0) return n
  return n + totalizer(n - 1)
}
console.log(totalizer(10300))  // 53050150

/* function sumTotal (num) {
  function _sum (num, accum) {
    if (num === 0) {
      return accum
    }
    return _sum(num - 1, accum + num)
  }
  return _sum (num, 0)
}
 */

function fibonacci_4  () {
  const memory = [0, 1] // 缓存
  return function fn (n) {
    if (memory.length <= n) {
      memory[n] = fn(n - 1) + fn(n - 2)
    }
    return memory[n]
  }
}
// 虽然包含两次递归调用, 但是实际上对于每个n, 函数只计算了一次。
const f_a = fibonacci_4()
console.log(f_a(1000))
