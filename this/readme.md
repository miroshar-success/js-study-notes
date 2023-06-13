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
    tips:
        1. 对于默认绑定来说，决定this绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。

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

    5. API调用的'上下文'
        JavaScript语言和宿主环境中许多新的内置函数，都提供了一个可选的参数。通常被称为'上下文'。
```js
function m1(el){
    console.log(el,this.id);
}
var obj = {
    id:'awesome'
}
var arr = [1,2,3];
arr.forEach(m1,obj);
```

    6. new绑定
```js
function foo(a){
    this.a = a;
}
const bar = new foo(2);
console.log(bar.a);
```

## this绑定优先级
    
    隐式绑定与 显示绑定 优先级 显示绑定高
```js
function foo(){
    console.log(this.a);
}
var obj1 = {
    a:2,
    foo
}
var obj2 = {
    a:3,
    foo
}
// 隐式绑定
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call(obj2);    // 3
obj2.foo.call(obj1);    // 2
```
    
    2. new绑定和隐式绑定
        new绑定优先级比隐式绑定要高。
```js
function foo(something){
    this.a = something;
}
var obj1 = {
    foo:foo
}
var obj2 = {};
obj1.foo(2);
console.log(obj1.a);    // 2

obj1.foo.call(obj2,3);
console.log(obj2.a);    // 3

var bar = new obj1.foo(4);
console.log(obj1.a);    // 2;
console.log(bar.a);     // 4
```
    
### 判断this

    1. 函数是否在new中调用，如果是的话，this绑定的是新创建的对象。
        var bar = new foo()
    2. 函数是否通过apply call 或者硬绑定调用。
        foo.call(obj);
    3. 函数是否在某个上下文对象中调用
        obj1.foo()
    4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined,否则绑定到全局对象
        var bar = foo();
        
### 被忽略的this

    如果你把null或者undefined作为this的绑定对象传入call,apply或者bind。这些值在调用时会被忽略
    实际应用的是默认绑定规则
    
    需要传入null的场景：
        1. 使用apply将数组参数展开 并当做参数传入函数。
```js
function foo(a,b){
    console.log('a:',a,'b:',a);
}
foo.apply(null,[2,3]);
```   
    2. 使用bind可以对参数进行柯里化
```js
var bar = foo.bind(null,3);
bar(2);
```
    这两种方法都需要传入一个参数当做this的绑定对象。如果函数不关心this的话，仍然需要传入一个占位置。
    
```js
function foo(a,b){
    console.log('a:',a,'b:',b);
}
var _$ = Object.create(null);
foo.apply(_$,[2,3]);

var bar = foo.bind(_$,3);
bar(2);
``` 
    一种更'安全'的做法是传入一个特殊的对象，把this绑定到这个对象不会对你的程序产生任何副作用。
    
## 箭头函数
    
    1. 箭头函数内的this对象,就是定义时所在的对象。而不是使用时所在的对象。
    2. 不可以当做构造函数，不可以使用new命令
    3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数替代。
```js
function baz(){
    return (b) => {
        console.log(this.b);
    }
}
var obj1 = {
    b:2
}
var obj2 = {
    b:3
}
var m1 = baz.call(obj1);
m1.call(obj2);  // 输出2 而不是3
```
    由于baz的this绑定到obj1, m1的this也会绑定到obj1。箭头函数的绑定无法被修改。
    
    
    
    
    