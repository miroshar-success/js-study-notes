# this关键字

    需要明确的是，JavaScript并不具有动态作用域,它只有词法作用域。但是this机制某种程度上很像动态作用域。
    
    动态作用域与词法作用域区别:
        动态作用域是在运行时确定的，词法作用域关注函数在何处声明。而动态作用域关注函数从何处调用。
        
    // this并不指向函数本身。count并不是函数本身的属性
```js
function foo(num){
    console.log('foo:',num);
    this.count++;
}
foo.count = 0;
for(var i = 0; i < 10; i++){
    if( i > 5) {
        foo(i);
    }
}
console.log(foo.count); // 0
```

    this是在运行时进行绑定的。并不是在编写时绑定。它的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何
    关系。只取决于函数的调用方式。
    
    this并不指向函数自身也不指向函数的词法作用域。它指向什么完全取决于函数在哪里调用。
    
    调用位置就是函数在代码中被调用的位置。就在当前正在执行的函数的前一个调用中。
    
## this绑定规则

    1. 默认绑定
```js
// 默认绑定
function foo(){
    console.log(this.a);
}
var a = 2;
foo();      // 2

// 严格模式下,this会绑定到undefined.
function bar(){
    'use strict'
    console.log(this.a);    // TypeError
}
bar();

// 在严格模式下调用baz 则不影响this绑定
function baz(){
    console.log('baz:',this.a);
}
(function(){
    'use strict';
    baz();  // baz: 2
})()
```

    2. 隐式绑定
```js
function foo(){
    console.log(this.a);
}
var obj = {
    a:3,
    foo:foo
}
obj.foo();  // 3
```
    1. 当函数拥有上下文对象时,隐式绑定规则会把函数调用中的this绑定到这个上下文对象。
    2. 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。
```js
function f1(){
    console.log(this.c);
}
var obj2 = {
    c:42,
    f1:f1
}
var obj1 = {
    c:2,
    obj2:obj2,
}
obj1.obj2.f1();
```
    3. 隐式丢失
       下面的代码 虽然bar是obj.foo的一个引用。但实际上，它引用的是foo函数本身。
```js
function foo(){
    console.log(this.a);
}
var obj = {
    a:2,
    foo:foo
}
var bar = obj.foo;
var a = 'global';
bar();  // global
```

    4. 显示绑定
```js
function foo(){
    console.log(this.a);
}
var obj = {
    a:2
}
foo.call(obj);      // 2
```

    