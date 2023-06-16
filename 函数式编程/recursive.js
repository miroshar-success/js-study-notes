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