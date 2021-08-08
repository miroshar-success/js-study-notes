/* 函数柯里化 */
function foo(a,b) {
  return function (c) {
    return a + b + c;
  }
}

const f = foo(1,3)
console.log(f(5)) // 9
console.log(f(6)) // 10


const isType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }
}

const isString = isType('String')
const isFunction = isType('Function')

console.log(isString('hello world'))  // true
console.log(isFunction(f))  // true
console.log(isFunction('hello world'))  // false
console.log(isString(f))  // false



/*
柯里化的封装
1. 将一个函数实现为柯里化的调用,参数是一个参数,该函数改造为柯里化
2. 判断参数的个数和函数接收到的参数格是否相等
const add = f(fun)
add(1)(2)(3)
add(1,2,3)
add(1,2)(3)
*/

function curry(func) {  // func为传递的参数, func.length为函数的参数个数, ...args为返回的函数接收的参数
  return function curriedFun(...args) {
    if(args.length < func.length) { // 如果被柯里化的函数的参数个数大于第一次接收的参数个数,则还需要接收剩下的参数
      return function() { // ...arguments接收剩下的参数
        const arr = [...args,...arguments]  // 将所有参数合并 接着传递给curriedFun,再次判断所有参数是否与被柯里化的函数的参数个数相等
        return curriedFun(...arr)
      }
    }
    return func(...args)
  }
}

function sum(a,b,c){
  return a + b + c;
}

const add = curry(sum)
console.log(add(1,2,3)) //6
console.log(add(1,2)(3))  // 6