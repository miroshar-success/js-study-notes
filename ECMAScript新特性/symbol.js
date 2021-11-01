const s1 = Symbol()
console.log('s1:', typeof s1) // symbol

const obj1 = {
  [Symbol('foo')]: 'foo',
  [Symbol('bar')]: 'bar'
}
console.log(obj1) // {[Symbol(foo)]:'foo', [Symbol(bar)]:'bar'}

console.log(obj1[Symbol('foo')])  //undefined, 不相同

const name = Symbol('name')
const obj2 = {
  [name]:'hello kyrie',
  say() {
    console.log(this[name])
  }
}
console.log(obj2[name]) // hello kyrie
obj2.say()  // hello kyrie


// Symbol参数是一个对象-------------
const obj3 = {
  [Symbol({firstName:'kyrie'})]: 'hello world'
}
console.log(obj3) // {[Symbol([object Object])]: 'hello world'}

// Symbol描述参数相同 foo foo
const sym1 = Symbol('foo'), sym2 = Symbol('foo');
console.log(sym1 === sym2)  // false

console.log(sym1.description === sym2.description)    // true


// Symbol作为对象的属性
let mySymbol = Symbol('你好')
let o = {};
Object.defineProperty(o,mySymbol,{
  value:'你好,世界'
})
console.log('o',o)

const log = {
  DEBUG:Symbol('DEBUG'),
  INFO:Symbol('INFO'),
  WARN:Symbol('WARN')
}
console.log('log:',log);

// ----------------------------------- 消除魔术字符串
function getArea(shape,options){
  let area = 0;
  switch(shape) {
    case 'Triangle':
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}
console.log(getArea('Triangle',{width:100,height:50}))  // 2500

// -------------------------------- Symbol遍历
/*
Symbol作为属性名的时候, 该属性不会出现在for...in for...of 循环中,也不会被 Object.keys() Object.getOwnPropertyNames()
JSON.stringify() 返回
*/

let player = {
  [Symbol('first')]: 'kyrie',
  [Symbol('last')]: 'irving',
  [Symbol('age')]: 30,
  team:'nets'
}
console.log('player:', player)

for(let key in player){
  console.log('for--in-key:', key)  // team
}

for(let key of Object.keys(player)){
  console.log('for-of-key:', key) // team
}

console.log(Object.getOwnPropertyNames(player)) // ['team']

console.log(Object.getOwnPropertySymbols(player));    // [ Symbol(first), Symbol(last), Symbol(age) ]
console.log(JSON.stringify(player)) // {"team":"nets"}


// ---------------------- Symbol.for()
console.log(Symbol.for('key') === Symbol.for('key'))  // true

let singer = {
  [Symbol.for('name')]:'jay chou',
  [Symbol.for('age')]: 42
}
console.log(singer[Symbol.for('name')]);  // jay chou


// 内置的Symbol值   内置的Symbol值
class Foo {
  [Symbol.hasInstance](foo) {
    console.log('foo:', foo)
    return foo instanceof Array;
  }
}
console.log([1,2,3] instanceof new Foo())   // true

// -------------------------------- symbol.toStringTag -----------------------------
console.log(Object.prototype.toString.call('foo'))  // [object String]
console.log(Object.prototype.toString.call(false))  // [object Boolean]
console.log(Object.prototype.toString.call(3))      // [object Number]
console.log(Object.prototype.toString.call([1,2,3]))  // [object Array]
console.log(Object.prototype.toString.call({name:'kyrie'})) // [object Object]
console.log(Object.prototype.toString.call(null))   // [object Null]
console.log(Object.prototype.toString.call(undefined))  // [object Undefined]
console.log(Object.prototype.toString.call(function(){})) // [object Function]
console.log(Object.prototype.toString.call(new Date())) // [object Date]
// ------ 引擎为它们设置好了toStringTag标签 ---------
console.log(Object.prototype.toString.call(new Map()))  // [object Map]
console.log(Object.prototype.toString.call(new Set()))  // [object Set]
console.log(Object.prototype.toString.call(function *m(){}))  // [object GeneratorFunction]

const d1 = {}
Object.defineProperty(d1,Symbol.toStringTag,{
  value:'hello world'
})
console.log(Object.prototype.toString.call(d1)) // [object hello world]
