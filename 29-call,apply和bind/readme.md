# Function.prototype.apply()
    
    apply()方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。
        call()方法的作用和apply()方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

# Bind

    bind()方法创建一个新的函数,在调用时设置this关键字为提供的值。并在调用新函数时,
    将给定参数列表作为原函数的参数序列的前若干项。
    
    语法:
        function.bind(thisArg[,arg1[,arg2[,...]]])
    参数:
        thisArg:
        调用绑定函数时作为this参数传递给目标函数的值。如果bind函数的参数列表为空,执行作用域的
        this将被视为新函数的thisArg.
        arg1,arg2
        当目标函数被调用时,预先添加到绑定函数的参数列表中的参数
```js
var module = {
    x:42,
    getX:function(){
        console.log(this.x);
    }
}
let bar = module.getX;
bar();  // undefined        函数在全局范围内调用,this隐式地绑定到了全局环境
```
```js
// 这个例子也是baz()是在全局环境下调用的,此时this指向window.
function foo(){
    console.log(this.a);
}
var obj = {
    a:2,
    foo:foo
}
var a = "hello world!";
let baz = obj.foo;
baz();      // hello world
```

# 偏函数

    bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数作为bind()的参数写在
    this后面。当绑定函数被调用时,这些参数会被插入到目标函数的参数列表开始的位置,传递给绑定函数的
    参数会跟在它们后面。
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    