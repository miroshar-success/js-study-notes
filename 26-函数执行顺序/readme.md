# 提升

```js
a = 2;
var a;
console.log(a); // 2

console.log(baz); // undefined
var baz = 3;
```
    包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。
    var a = 2; JavaScript会将其看成两个声明: var a; a = 2; 
        第一个定义声明是在编译阶段进行的。第二个赋值声明会被留在原地等待执行。
```js
foo()
function foo(){
    console.log(a); // undefined
    var a = 2;
}

// 上面的代码可以理解为 下面的执行顺序
function foo(){
    var a;
    console.log(a); // undefined
    a = 2;
}
foo()
```
    tips:
        1. 函数声明会被提升，但是函数表达式却不会被提升。
        2. 即使是具名的函数表达式，名称标识符在赋值操作之前也无法在所在作用域中使用。
 ```js
foo();  // TypeError    foo is not a function
bar();  // Reference    bar is not defined
var foo = function bar(){

}
```
    