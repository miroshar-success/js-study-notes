const s1 = Symbol()
console.log('s1:', typeof s1)

const obj1 = {
  [Symbol('foo')]: 'foo',
  [Symbol('bar')]: 'bar'
}
console.log(obj1)

console.log(obj1[Symbol('foo')])  //undefined

const name = Symbol('name')
const obj2 = {
  [name]:'hello kyrie',
  say() {
    console.log(this[name])
  }
}
console.log(obj2[name])
obj2.say()


// Symbol参数是一个对象-------------
const obj3 = {
  [Symbol({firstName:'kyrie'})]: 'hello world'
}
console.log(obj3)

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
console.log(o)

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