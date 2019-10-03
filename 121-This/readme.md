# this关键字

	当调用一个函数时,将创建一个激活记录。这个记录包含了函数从哪里被调用的信息(调用堆栈),函数是如何被调用的,传递了什么参数等等。


# 单独的函数调用

```js
function foo(){
    console.log(this.a);
}
var a = 2;
foo();  // 2
```

# 严格模式
    
    严格模式下,禁止this指向全局对象,此时this的值为 undefined
```js
function foo(){
    "use strict"
    console.log(this.a);
}
var a = 2;
foo();      // 报错, cannot read property "a" of undefined



// foo函数运行时外部为严格模式,和内部的this执行是无关紧要的
function foo(){
    console.log(this.a);
    console.log(this);  // 此时依然指向window
}
let a = 2;
(function(){
   "use strict";
   foo();   // 2
})()
```
# 对象上下文

    1. 隐式绑定
```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2
````

    2. 只有对象属性引用链的顶层/最后一层与调用站点有关。
```js
function foo() {
	console.log( this.a );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42
```

    3. this失去了隐式绑定
```js
function foo() {
    console.log(this);
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
obj.foo();  // obj对象, a的值为2
var bar = obj.foo; 
var a = "oops, global"; 
bar(); // window对象   a的值为"oops, global"
```
    4. 函数作为参数传递到另一个函数
```js
function foo(){
    console.log(this.a);
}
function doFoo(fn){
    fn();
}
var obj = {
    a:2,
    foo:foo
}
var a = "hello world";
doFoo(obj.foo);

// 如果传递回调函数的函数是该语言内置的函数,结果是一样的

function foo(){
    console.log(this.a);
}
var obj = {
    a:2,
    foo:foo
};
var a = "opps,global";
setTimeout(obj.foo,100);
```

# call()/apply()绑定

```js
function foo() {
	console.log( this.a );
}
var obj = {
	a: 2
};
foo.call(obj); // 2         call会立即执行
```

 Example
```js
function foo(){
    console.log(this.a);
}
var obj = {
    a:2
}
var bar = function(){
    foo.call(obj);
}
bar();  // 2
setTimeout(bar,1000);   // 2
bar.call(window);   // 2

// bar() 将foo函数的this强制绑定到对象obj上, 后面再通过call修改到指向window也覆盖不了
```

# bind绑定
    
    bind()返回一个新函数,它是硬编码的,按照指定的上下文调用原始函数。
```js
function foo(something){
    console.log(this);
    console.log(this.a,something);
    return this.a + something;
}
var obj = {
    a:2
}
var bar = foo.bind(obj);
console.log(bar);
var b = bar(3); // 2,3
console.log(b); // 5
```
    tips:
    1. 从ES6开始,bind()生成的硬绑定函数具有name属性,该属性派生自原始目标函数。例如:
    bar = foo.bind()有一个bar.name属性值 "bound foo",
    
# 新的内置函数this指向

    JavaScript语言和宿主环境中许多新的内置函数,都提供了一个可选参数,通常称为"context",它被设计为一种解决方案,
    不必使用bind()来确保回调函数使用特定的this。
```js
function foo(el){
    console.log(el,thid.id);
}
var obj = {
    id:"awesome"
}
[1,2,3].forEach(foo,obj);   // 1 'awesome'  2 'awesome'  3 'awesome'

```