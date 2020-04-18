
# 理解作用域

    对于JavaScript来说,大部分情况下编译发生在代码执行前的几微秒（甚至更短）的时间内。任何JavaScript代码片段在执行前
    都要进行编译(通常就在执行前),因此,JavaScript编译器首先会对 var a = 2;进行编译,然后做好执行它的准备。
    
    1. 引擎
        负责整个JavaScript程序的编译及执行过程。
    2. 编译器
        负责愈发分析及代码生成
    3.  作用域
        负责收集并维护由所有声明的标识符组成的一系列查询,并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。
        
# JS引擎查找变量的方式

    LHS和RHS
    当变量出现在复制操作的左侧时进行LHS查询,出现在非左侧进行RHS查询。可以将其理解为 
    赋值操作的目标是谁(LHS) 以及 谁是赋值操作的源头(RHS)。
    
    当一个块或者函数 嵌套 在另一个 块或者函数中时，就发生了作用域的嵌套。因此,在当前作用域中无法找到某个变量时,引擎就会
    在外层嵌套的作用域中继续查找。直到找到该变量为止。
    
## 异常

    在变量没有声明(在任何作用域都无法找到该变量的情况下),LHS和RHS查询的行为是不一样的。
    
    如果RHS查询在所有嵌套的作用域中遍寻不到所需的变量,引擎就会抛出ReferenceError异常。相比较之下,当引擎执行LHS查询时，
    如果在顶层也没有找到目标变量,全局作用域中就会创建一个具有该名称的变量,并将其返还给引擎。  
    
    在严格模式中,使用LHS查询失败时,引擎会抛出同RHS查询失败时类似的ReferenceError异常。
    
    tips:
    1. ReferenceError 同作用域判断失败相关,而TypeError 则代表作用域判断成功了，但是对结果的操作是非法或不合理的
```js
function foo(a){
    b = 3;
    console.log(a + b);
}
foo(3);
// 6;


function bar(a){
    'use strict';
// LHS查询失败时,引擎会抛出同RHS查询失败时类似的ReferenceError异常。
    b = 3;
    console.log(a + b);
}
bar(3); // ReferenceError
```  
    
# 词法作用域

    词法作用域就是定义在词法阶段的作用域。换句话说,词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的。
    
    tips:
    1. 作用域查找会在找到第一个匹配的标识符时停止。在多层嵌套作用域中可以定义同名的标识符,这叫做'遮蔽效应'。
    2. 无论函数在哪里被调用,也无论它如果被调用.它的词法作用域都只由函数被声明时所处的位置决定。
    3. 词法作用域只会查找一级标识符，如果代码中引用了foo.bar.baz,词法作用域只会试图查找foo标识符。
    
## eval
```js
function foo(str,a){
    eval(str);
    console.log(a,b);
}
var b = 2;
foo('var b = 3',1);
```
    在严格模式中,eval() 在运行时有自己的词法作用域。意味着其中的声明无法修改所在的作用域。
```js
function foo(str){
    'use strict';
    eval(str);  // ReferenceError 
    console.log(a);
}
foo('var a = 3');
```

# 函数作用域和块作用域

    函数作用域的含义是指 属于这个函数的全部变量 都可以在整个 函数的范围内使用及复用（在嵌套的作用域中也可以使用）。
    
    1. 隐藏内部实现
        很多原因促成了基于作用域的隐藏方法。他们大都是从最小特权原则中引申出来的,也叫最小授权或最小暴露原则。应该最小限度地
        暴露必要内容,而将其他内容都'隐藏'起来。
```js
function doSomething(a){
    b = a + doSomethingElse(a * 2);
    console.log(b * 3);
}
function doSomethingElse(a){
    return a - 1;
}
var b;
doSomething(2); // 15
```

    改成下面的写法,变量b 和 函数doSomethingElse 都无法在 函数doSomething外部访问。
```js
function doSomething(a){
    b = a + doSomethingElse(a * 2);
    console.log(b * 3);
    function doSomethingElse(a){
        return a - 1;
    }
    var b;
}
doSomething(2); // 15
```
## 函数作用域

    在任意代码片段外部添加包装函数,可以将内部变量和函数定义'隐藏'起来,外部作用域无法访问包装函数内部的任何内容。
    虽然这一技术可以解决一些问题,但是也会导致一些新的问题。首先必须声明一个具名函数， 意味这这个具名函数本身'污染'了所在的
    作用域。 其他必须显式地通过 函数名调用这个函数才能运行其中的代码。
    
    tips:
    1. 区分函数声明和函数表达式最简单的方法是看function 关键字 出现在声明中的位置，如果function是声明中的第一个词,
    那么就是一个函数声明,否则就是一个函数表达式。
    2. 函数表达式可以匿名,但函数声明不可以省略函数名。
```js
// foo 是一个函数表达式
var a = 2;
(function foo(){
    var a = 3;
    console.log(a);
})();
console.log(a);
```
    匿名函数表达式最常见的场景
```js
    // 匿名函数表达式
setTimeout(function(){
    console.log('Hello World!');
},2000);
```
    1. 如果没有函数名,当函数需要引用自身时只能使用已经过期的arguments.callee. 比如在递归中
    2. 另一个需要引用自身的例子,是在事件触发后事件监听器需要解绑自身。
    
    总结: 始终给函数一个表达式命名 是一个最佳实践。
```js
setTimeout(function timeoutHandler(){
    console.log('I wait 1 second');
},1000);
```