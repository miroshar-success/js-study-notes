// ---------- ES6引入了一种原始数据类型 Symbol,表示独一无二的值 -----------

const s1 = Symbol()
console.log('s1:', typeof s1) // symbol

// ------- symbol可以接受一个字符串作为参数,表示对Symbol实例的描述。------
const obj1 = {
  [Symbol('foo')]: 'foo',
  [Symbol('bar')]: 'bar'
}
console.log(obj1) // {[Symbol(foo)]:'foo', [Symbol(bar)]:'bar'}

console.log(obj1[Symbol('foo')])  //undefined, 不相同

// ------- ---------
const s_1 = Symbol('s1'), s_2 = Symbol('s2')
console.log(s_1.toString(), s_2.toString(), typeof s_1, typeof s_2) // Symbol(s1) Symbol(s2) symbol symbol

const name = Symbol('name')
const obj2 = {
  [name]:'hello kyrie',
  say() {
    console.log(this[name])
  }
}
console.log(obj2[name]) // hello kyrie
obj2.say()  // hello kyrie


// ---------  Symbol参数是一个对象-------------
const obj3 = {
  [Symbol({firstName:'kyrie'})]: 'hello world'
}
console.log(obj3) // {[Symbol([object Object])]: 'hello world'}

// ------  Symbol描述参数相同 foo foo (只表示对当前symbol的描述) -----------
const sym1 = Symbol('foo'), sym2 = Symbol('foo');
console.log(sym1 === sym2)  // false

console.log(sym1.description === sym2.description)    // true

// --------- symbol 不可以与其他类型的值进行计算 ------------
// console.log('hello,' + sym1) //Cannot convert a Symbol value to a string

// Symbol作为对象的属性
const mySymbol = Symbol('你好')
let o = {};
Object.defineProperty(o,mySymbol,{
  value:'你好,世界'
})
console.log('o',o) // {Symbol(你好): '你好,世界'}

// ------- 保证常量的值都是不想等的 --------
const log = {
  DEBUG:Symbol('DEBUG'),
  INFO:Symbol('INFO'),
  WARN:Symbol('WARN')
}
console.log('log:',log); // { DEBUG: Symbol(DEBUG), INFO: Symbol(INFO), WARN: Symbol(WARN) }

// ------------- 消除魔术字符串 ------------
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

// ---------- Symbol遍历 -----------
/*
Symbol作为属性名的时候, 该属性不会出现在for...in for...of 循环中,也不会被 Object.keys() Object.getOwnPropertyNames()
JSON.stringify() 返回
*/

const player = {
  [Symbol('first')]: 'kyrie',
  [Symbol('last')]: 'irving',
  [Symbol('age')]: 30,
  team:'nets'
}
console.log('player:', player)
/* {
    team: 'nets',
    [Symbol(first)]: 'kyrie',
    [Symbol(last)]: 'irving',
    [Symbol(age)]: 30
} */


for(let key in player){
  console.log('for--in-key:', key)  // team
}

for(let key of Object.keys(player)){
  console.log('for-of-key:', key) // team
}

console.log(Object.getOwnPropertyNames(player)) // ['team']

console.log(Object.getOwnPropertySymbols(player));    // [ Symbol(first), Symbol(last), Symbol(age) ]
console.log(JSON.stringify(player)) // {"team":"nets"}


// ----------- Symbol.for() ---------
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


// ------- 为对象定义一些私有属性 --------
const size = Symbol('size')

class Collection {
  constructor() {
    this[size] = 0
  }
  add(item) {
    this[size]+=1
    this[this[size]] = item
  }
  static sizeOf(instance) {
    return instance[size]
  }
}

const collection = new Collection()
console.log( Collection.sizeOf(collection) )  //0

collection.add('hello')
collection.add('world')

console.log(Collection.sizeOf(collection))  // 2
console.log('collection:', collection)  // { '1': 'hello', '2': 'world', [Symbol(size)]: 2 }

console.log(Object.keys(collection))  // [ '1', '2' ]
console.log(Object.getOwnPropertyNames(collection)) // [ '1', '2' ]
console.log(Object.getOwnPropertySymbols(collection)) // [ Symbol(size) ]

// --------- Symbol.for -------------
// 检索有没有以指定参数作为名称的Symbol值, 有的话返回,没有的话创建一个
const for_1 = Symbol.for('foo1')
const for_2 = Symbol.for('foo1')
console.log(for_1 === for_2)  // true

// Symbol.keyFor() 返回一个已登记的 symbol类型的值 key

const register_symbol = Symbol('hello')
const register_symbol2 = Symbol.for('world')
console.log('symbol-key:', Symbol.keyFor(register_symbol))  // undefined
console.log('symbol-key:', Symbol.keyFor(register_symbol2)) // world


// --------- 内置的Symbol值 -----------
// ---- Symbol.hasInstance ---
function Animal(){}
class Player {
  constructor(name) {
    this.name = name
  }
  [Symbol.hasInstance](player) {
    console.log('hello')
    return player instanceof Player
  }
}

const kyrie = new Player('kyrie')
console.log(kyrie instanceof Player)  // true

// --------- Symbol.iterator --------
const object = {
  0: 'hello',
  1: 'world',
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
  length: 2
}

for(let item of object){
  console.log('item', item) // hello world
}

const james = {
  firstName:'lebron',
  lastName:'james',
  age:37,
  length:3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for(let item of james){
  console.log(item) // undefined undefined undefined
}


const irving = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30,
  [Symbol.iterator]: function() {
    const _this = this;
    let nextId = 0
    return {
      next: function() {
        const keys = Object.keys(_this)
        if(nextId < keys.length) {
          return {
            value: _this[keys[nextId++]],
            done: false
          }
        }else{
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}

for(let item of irving){
  console.log('irving:', item)
}
/*
irving: kyrie
irving: irving
irving: 30
*/


// ------- Symbol.toStringTag -------
const stringSymbol = Symbol('string')

console.log(stringSymbol.toString())  // Symbol(string)
console.log(Object.prototype.toString.call(stringSymbol)) // [object Symbol]

const tag = {
  [Symbol.toStringTag]: 'Hello'
}
console.log(Object.prototype.toString.call(tag))  // [object Hello]
