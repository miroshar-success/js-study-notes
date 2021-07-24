# 函数

  随着react的流行受到越来越多的关注,函数编程可以抛弃this,打包过程中可以更好的利用tree shaking过滤无用代码
  方便测试,方便并行处理。
```js
// 匿名函数
function () {}
() => {}

// 命名函数
function foo() {}
const foo = () => {}

// 内部函数是另一个函数内的函数,外部函数是包含一个函数的函数
function addSquare(a,b) {
  function square(x) {
    return x * x
  }
  return square(a) + square(b)
}

// 递归函数
function loop(x) {
  if(x >= 10) return
  loop(x+1)
}

// 立即调用函数表达式
(function foo() {
  console.log('hello world')
})()
(function foo(){
  console.log('hello world')
}())
```
## 高阶函数

  函数可以作为参数传递另一个函数 / 函数可以作为另一个函数的返回值

  The arguments of a function are not limited to strings and number. You can pass whole 
  objects to a function.

  A function can call itself.For example, here is a function that computes factorials recursively;
```js
function factorial(n){
  if( n === 1 || n === 0) return 1;
  return (n * factorial(n - 1))
}
```
  常用高阶函数
  forEach / map / some / every / find / findIndex / sort / reduce
## Function scope

  A function defined in the global scope can access all variables defined in the global scope. A
  function defined inside another function can also access all variables defined in its parent
  function, and any other variables to which the parent function has access.
```js
// The following variables are defined in the global scope
let num1 = 20,
    num2 = 3,
    name = 'kyrie';
// This function is defined in the global scope
function multiply() {
  return num1 * num2;
}
multiply() //return 60

// A nested function example
function getScope(){
  var num1 = 2,
      num2 = 3;
  function add(){
    return name + 'scoped' + (num1 + num2);
  }
  return add()
}
getScope(); // kyrie scoped 5;
```

## Function stack

  A function can refer to and call itself. There three ways for a function to refer to itself.
    1. The function's name
    2. arguments.callee
    3. An in-scope variable that refers to the function

  closure
    1. The inner function can be accessed only from statements in the outer function
    2. The inner function forms a closure: The inner function can use the arguments and variables of the outer function
    while the outer function cannot use the arguments and variables of the inner function.

[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
[reduce方法](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/JavaScript/Reference/Global_Objects/Array/Reduce)