
# 1. Promise

    Promise是异步编程的一种解决方案.里面保存着某个未来才会结束的事件的结果。

    1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending(进行中)，fulfilled(已成功)
    和rejected(已失败)。
    2. 一旦状态改变,就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变,只有两种可能：从pending到
    fulfilled和从pending变为rejected。只要这两种情况发生,状态就凝固了，不会再变了。

    有了Promise对象，就可以将异步操作以同步操作的流程表达出来,避免了层层嵌套的函数。

    tips:
    1. Promise对象是一个构造函数,用来生成Promise实例。
    2. Promise构造函数接受一个函数作为参数,函数有两个参数分别是resolve和reject.
    3. resolve是将Promise对象的状态从'未完成'变为'成功',(pending->resolved),在异步操作成功时调用,并将异步
    操作的结果,作为参数传递出去;
    4. reject,将Promise对象的状态从'未完成'变为'失败'(pending->rejected),在异步调用失败时,将异步操作报出的
    错误，作为参数传递出去。
    5. Promise实例生成以后,可以用then方法分别指定resolved和rejected状态的回调函数。
    6. then的第一个回调函数是Promise对象的状态变为resolved时调用,第二个回调函数
    是Promise对象的状态变为rejected时调用。

```js
let promise = new Promise(function(resolve,reject){
    console.log('Promise');
    resolve();
});
promise.then(function(){
    console.log('resolved');
});
console.log('Hi');

// 输出的顺序为 Promise Hi resolved
```

    1. Promise.prototype.then
    then方法是定义在原型对象Promise.prototype上的。then方法返回的是一个新的Promise实例

    2. Promise.prototype.catch()
    该方法是.then(null,rejection)或.then(undefined,rejection)的别名,用于指定发生错误时的
    回调函数。

    3. 如果Promise状态已经变成resolved,再抛出错误时无效的。因为Promise的状态一旦改变,就
    永久保持该状态,不会再变了。

    4. 如果没有使用catch方法指定错误处理的回调函数,Promise对象抛出的错误不会传递到外层代码。

    Promise.prototype.finally()
    finally方法用于不管Promise对象最后状态如何,都会执行的操作。
