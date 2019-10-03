<!-- TOC -->autoauto- [1. getOwnPropertyDescriptor()](#1-getownpropertydescriptor)auto- [2. 遍历对象的方法](#2-遍历对象的方法)auto- [3. Object.keys()/Object.value()/Object.entries()](#3-objectkeysobjectvalueobjectentries)auto- [4. Object.assign()](#4-objectassign)auto- [5. Object.defineProperty()](#5-objectdefineproperty)autoauto<!-- /TOC -->

# 1. getOwnPropertyDescriptor()

    Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符.
    
    Object.getOwnPropertyDescriptor(obj,prop)

    value:该属性的值          
    writable:当且仅当属性的值可以被改变时为true
    enumerable:当且仅当指定对象的属性可以被枚举出时，为 true
    configurable:当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true

# 2. 遍历对象的方法

    1. for...in
        for...in循环遍历对象自身的和继承的可枚举属性
    
    2. Object.keys(obj)
        返回一个数组,包括对象自身的所有可枚举属性的键名

    3. Object.getOwnPropertyNames(obj)
        返回一个数组,包含对象自身的所有属性的键名

    4. Object.getOwnPropertySymbols(obj)
        返回一个数组,包含对象自身的所有Symbol属性的键名

    5. Reflect.ownKyes(obj)
        返回一个数组,包含对象自身的所有键名,不管键名是Symbol或字符串,也不管是否可枚举

# 3. Object.keys()/Object.value()/Object.entries()

    分别遍历对象自身可枚举的属性 键名,键值和键值对,以数组的形式返回,可以使用for...of遍历

    
    数组也有这几个方法,使用方式不同,数组返回的是遍历器接口,Array Iterator,也可以使用for...of遍历
    也可以手动调用遍历器的对象的next方法,返回的也是数组
```js
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

# 4. Object.assign()

    Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    
    如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。

    Object.assign(target,source);   返回目标对象

    针对深拷贝,需要使用其他方法,因为Object.assign()拷贝的是属性值.假如源对象的属性值是一个指向对象的引用,它也只拷贝那个引用值.

tips: 注意是 **源对象** 的 **可枚举属性** 复制到目标对象上

```js
function test(){
    'use strict'
    let obj1 = {a:0,b:{c:0}};
    let obj2 = Object.assign({},obj1);
    console.log( JSON.stringify(obj2) );    // {a:0,b:{c:0}}
    
    obj1.a = 1;
    console.log(JSON.stringify(obj1));  //  {a:1,b:{c:0}}
    console.log(JSON.stringify(obj2));  //  {a:0,b:{c:0}}

    obj2.a = 2;
    console.log(JSON.stringify(obj1));  // {a:1,b:{c:0}}
    console.log(JSON.stringify(obj2));  // {a:2,b:{c:0}}

    obj2.b.c = 3;
    console.log(JSON.stringify(obj1));  // {a:1,b:{c:3}}
    console.log(JSON.stringify(obj2));  // {a:2,b:{c:3}}
}
test();
```

# 5. Object.defineProperty()

    直接在一个对象上定义一个新属性,或者修改一个对象的现有属性,并返回这个对象。默认情况下,使用Object.defineProperty()添加的
    属性值是不可修改的.

    enumerable:boolean
    是否可以被for...in 或者 Object.entries()遍历

# 6. Object.create()

    Object.create()方法创建一个新对象,使用现有的对象来提供新创建的对象的__proto__
```js
const person = {
    isHuman:false,
    printIntroduction:function(){
        console.log(`My name is ${this.name} Am i human?${this.isHuman}`);
    }
}
// 新创建的对象me 的__proto__ 等于person
const me = Object.create(person);
me.name = 'Jack';
me.isHuman = true;
me.printIntroduction(); // My name is Jack Am i human?true
console.log(me);
console.log(me.__proto__.__proto__ == Object.prototype);    // true
```

    {} 相当于这种方法创建的 Object.create(Object.prototype);