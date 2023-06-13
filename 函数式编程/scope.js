// js静态作用域(首先在该名称所处的作用域内查找声明, 如果未找到 继续向上查找)
// 静态作用域 (空间上最近的声明)
let x = 1
function f() {
  let x = 3
  g()
}

function g() { // 静态作用域, 读取的x是靠近它的作用域块(此处为全局作用域)  和this关键字的含义不同(取决于代码被调用时确定this指向)
  console.log(x)  // 1
  x = 2
}
f() 
console.log(x)  // 2


var fn = 1
function fn() { // 函数声明优先级高于变量声明
  console.log('hello')
}
console.log(fn, typeof fn)  // 1, number
/**
 * 1. 函数声明会提升
 * 2. 变量声明也会提升
 * 3. 函数是一等公民
 * var fn
 * var fn
 * fn = function() {
 *  console.log('hello')
 * }
 * fn = 1
*/
function a() {
  console.log('123')
}
var a // a不会重复声明
console.log(typeof a) // 'function'


console.log(b)  // function b
var b = 3
console.log(b)  // 3
function b() {}



// ------------ 闭包 ------------------
const f1 = (a) => {
  return () => {
    a++
    return a
  }
}

const get_a = f1(4)
console.log(get_a())  // 5
console.log(get_a())  // 6
console.log(get_a())  // 6