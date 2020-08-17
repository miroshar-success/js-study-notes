<!-- TOC -->

- [1. 尾递归](#1-尾递归)
- [2. 纯函数](#2-纯函数)
- [3. 偏函数](#3-偏函数)
- [4. 函数柯里化](#4-函数柯里化)
- [5. 反柯里化](#5-反柯里化)
- [6. 函数节流](#6-函数节流)
- [7. 函数防抖](#7-函数防抖)

<!-- /TOC -->
# 函数式编程

    函数作为一等公民,使用上非常自由,调用它,作为参数,或者作为返回值都可以。
    高阶函数是可以把函数作为输入或者返回值。
    
    数组的排序方法: sort() 接收一个方法作为参数参与运算排序,是一个货真价实的高阶函数。

# 1. 尾递归

    如果一个函数中所有递归形式的调用都出现在函数的末尾，我们称这个递归函数是尾递归的.
    当编译器检测到一个函数调用是尾递归的时候，它就覆盖当前的活动记录而不是在栈中去创建一个新的.

    尾递归调用，其实最精髓就是 通过参数传递结果,达到不压栈的目的.

    函数调用会在内存形成一个"调用记录"，又称"调用帧"（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B,
    那么在A的调用记录上方，还会形成一个B的调用记录。等到B运行结束，将结果返回到A，B的调用记录才会消失。如果函数B内部还调用函数C，
    那就还有一个C的调用记录栈，以此类推。所有的调用记录，就形成一个"调用栈"（call stack）。

# 2. 纯函数
    
    一个函数的返回结果只依赖于它的参数,并且在执行过程中里面没有副作用,把这种函数叫做纯函数。
    3个原则:
    1. 变量都只在函数作用域内获取,作为函数的参数传入
    2. 不会产生副作用,不会改变传入的数据
    3. 相同的输入保证相同的输出(same input --> same output)

    可观察的副作用?
        函数内部与其外部的任意交互。可能是在函数内修改外部的变量,或者在函数里调用另外一个函数
    
	
	数组的slice方法 符合纯函数的定义,不会改变原数组,相同的输入会有相同的输出
	而splice()方法会改变原数组.每次输入相同的值得到不同的输出。
	
	
![纯函数](https://blog.csdn.net/qq_42129063/article/details/81814761)
![纯函数案例](https://ultimatecourses.com/blog/pure-versus-impure-functions)
    
# 3. 偏函数
	
	定义:
    1. 偏函数是指创建一个调用另外一个部分--参数或变量已经预置的函数--的函数的用法。
	2. 固定一个函数的一个或多个参数,返回一个新函数。这个函数用于接受剩余的参数。
```js
Example

var toString = Object.prototype.toString;
function isString (obj){
    return toString.call(obj) == '[Object String]';
}
function isFunction(obj){
    return toString.call(obj) == '[Object Function]';
}


function isType(type){
    return function(obj){
        return Object.prototype.toString.call(obj) == `[object ${type}]`
    }
}
// 上面这种通过指定部分参数来产生一个新的定制函数的形式就是偏函数。
```
![偏函数和bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

# 4. 函数柯里化
	
	接受多个参数的函数变换成接受一个单一参数的函数,并且返回接受余下的参数而且返回结果的新函数。
	
    转换一个函数调用 f(a,b,c) ==> f(a)(b)(c);
    


# 5. 反柯里化

```js
Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        let obj = Array.prototype.shift.call(arguments);
        return self.apply(obj,arguments);
    }
}
```

# 6. 函数节流

```js
let flag = true;
window.onscroll = function(e){
    if(!flag) return;
    flag = false;
    setTimeout(function(){
        console.log('屏幕滚动了');
        flag = true;
    },500);
}
```

