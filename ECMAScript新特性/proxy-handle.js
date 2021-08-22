// handler.apply()  用于拦截函数的调用

function sum (a,b) {
  return a + b;
}
const handler = {
  apply:function(target,thisArg,argumentsList) {
    console.log(`Calculate sum: ${arguments}`,...argumentsList);
    console.log('this:', thisArg);
    return target(argumentsList[0],argumentsList[1]) * 10;
  }
}
const proxy1 = new Proxy(sum,handler);
console.log(sum(1,2)) // 3
console.log(proxy1(1,2))  // 30

// handler.construct  用于拦截new 操作符,使new操作符在生成的Proxy对象上生效。
function Foo() {
  console.log('我是Foo')
  console.log('new-target:',new.target)
}
Foo()
new Foo();

const proxy_constructor = new Proxy(function(){}, {
  construct:function(target,argumentsList,newTarget){
    console.log(target,newTarget);
    return {value:argumentsList[0] * 10}
  }
})
console.log(new proxy_constructor(10));

const proxy_constructor2 = new Proxy(Foo,{
  construct:function(target,argumentsList,newTarget){
    console.log('target:',target,'newTarget:',newTarget)
    return {name:'kyrie'}
  }
})
console.log(new proxy_constructor2());

function Monster(name) {
  this.disposition = name;
}
const handler1 = {
  construct(target,args) {
    return new target(...args);
  }
}
const m = new Proxy(Monster,handler1);
console.log(new m('hello'));


// handle.defineProperty() 用于拦截Object.defineProperty() 操作。
const define_proxy = new Proxy({b:100}, {
  defineProperty:function(target,prop,descriptor) {
    console.log(target,prop,descriptor)
    return true;
  }
})
Object.defineProperty(define_proxy,'a', {
  value:10,
  configurable:true,
  enumerable:true,
  writable:false
})
// handler.deleteProperty // 拦截对象delete操作。
const delete_proxy = new Proxy({a:100,b:200,c:300},{
  deleteProperty(target,prop) {
    // console.log(target,prop)
    // if(prop === 'a') {
    //   return true;
    // }else{
    //   return false;
    // }
    return true;
  }
})
delete delete_proxy.b
delete delete_proxy.a
console.log('delete_proxy:', delete_proxy)

// --------------------------- handler.get 用于拦截对象的读取属性操作
const person = {name:20,age:30}
const get_proxy = new Proxy(person,{
  get:function(target,property) {
    if(property === 'age') {
      return 10;
    }else{
      return target[property]
    }
  }
})
console.log(get_proxy.age, get_proxy.name);

// ----------------------------------- handler.getOwnPropertyDescriptor()
const descriptor_proxy = new Proxy({a:100},{
  getOwnPropertyDescriptor:function(target,prop) {
    console.log(target,prop)
    return {
      configurable:true,
      enumerable:false,
      value:10
    }
  }
})
console.log(Object.getOwnPropertyDescriptor(descriptor_proxy,'a').value)

// --------------------------------------- handler.getPrototypeOf() 读取对象的原型
const monster1 = {
  eyeCount:4
}
const monsterPrototype = {
  eyeCount:2
}
const get_prototype_proxy = new Proxy(monster1,{
  getPrototypeOf:function(target) {
    console.log('monster-prototype:', monster1)
    return monsterPrototype
  }
})
console.log(Object.getPrototypeOf(get_prototype_proxy) === monsterPrototype)  // true


// ---------------------------------- isPrototypeOf()方法允许你检查一个对象是否存在于另一个对象的原型链上。
function Bar() {}
const bar = new Bar()
console.log(Bar.prototype.isPrototypeOf(bar));  // true
console.log(bar instanceof Bar) // true
console.log(bar instanceof Bar) // true

// instanceof 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
function Car(make, model,year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('China', 'Accord', 1998)
console.log(auto, auto instanceof Car, auto instanceof Object);

function C() {}
const o = new C();
console.log(o instanceof C, o instanceof Object) // true true
console.log(C.prototype instanceof Object)  // true
C.prototype = {};
const o2 = new C();
console.log(o2 instanceof C)  // true
console.log(o instanceof C) // false


const prototype_proxy = new Proxy({}, {
  getPrototypeOf(target) {
    return Array.prototype;
  }
})
console.log(Object.getPrototypeOf(prototype_proxy) === Array.prototype) // true
console.log(prototype_proxy.__proto__ === Array.prototype)  // true
console.log(Array.prototype.isPrototypeOf(prototype_proxy)) // true
console.log(prototype_proxy instanceof Array) // true
console.log(prototype_proxy instanceof Array.prototype.constructor) // true

// ------------------------------------------ handler.has()
const has_proxy = new Proxy({
  _secret:'easily scared',
  eye_count:4
}, {
  has(target,key) {
    if(key[0] === '_'){
      return false;
    }
    return key in target;
  }
})
console.log('_secret' in has_proxy) // false
console.log('eye_count' in has_proxy) // true

// -------------------- handler.set()
const mon = {eyeCount:4}
const set_proxy = new Proxy(mon,{
  set:function(target,prop,value) {
    if( (prop === 'eyeCount' && (value % 2) !== 0) ) {
      console.log('Monsters must have an even number of eyes')
    }else{
      return Reflect.set(...arguments)
    }
  }
})
set_proxy.eyeCount = 1;
set_proxy.eyeCount = 4;


// ------------------------- handler.deleteProperty
const player = {
  firstName: 'kyrie',
  lastName: 'irving',
  age:30
}
const player_proxy = new Proxy(player,{
  deleteProperty:function(target, prop) {
    console.log('target:', target, prop)
    if(prop === 'age') {
      delete target[prop]
      return true;
    }else{
      return false;
    }
  }
})
delete player_proxy.age;
delete player_proxy.firstName;
console.log(player_proxy)