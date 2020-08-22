# Proxy

    用于修改某些操作的默认行为，等同于在语言层面作出修改。
    
    ES6原声提供Proxy构造函数，用来生成Proxy实例。
```js
var proxy = new Proxy(target,handler);
```
    target参数表示所要拦截的目标对象，handler参数也是一个对象,用来定制拦截行为。