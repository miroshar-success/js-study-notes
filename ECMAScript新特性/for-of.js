// --------------- 数组遍历 ------------
const players = ['kyrie', 'lebron', 'durant']
for(let player of players){
  console.log('player:', player)
  /*
  player: kyrie
  player: lebron
  player: durant
  */
}

function makeIterator(array) {
  let nextIndex = 0;
  return {
    next:function() {
      return nextIndex < array.length ?
        {
          value:array[nextIndex++],
          done:false
        }
        : {
          value:undefined,
          done:true
        }
    }
  }
}
const iteratorPlayer = makeIterator(players)
console.log(iteratorPlayer.next())
console.log(iteratorPlayer.next())
console.log(iteratorPlayer.next())
/*
{ value: 'kyrie', done: false }
{ value: 'lebron', done: false }
{ value: 'durant', done: false }
*/

// -------------------- 字符串遍历 -------------
const string = 'hello world'
for(let key of string){
  console.log(key)
}
// -------- 原生具备 Iterator接口的数据格式 ------
/*
Array, Map, Set, String, TypedArray arguments对象, NodeList对象
*/
const map = new Map()
map.set('h', 'hello')
map.set('w', 'world')
console.log('map', map) // { 'h' => 'hello', 'w' => 'world' }
for(let [key, value] of map){
  console.log('map', key, value)
}

const set = new Set(['hello', 'world', 'message'])
for(let key of set){
  console.log('set:', key)  // hello world message
}

function foo() {
  console.log(arguments)
  for(let key of arguments){
    console.log('argument', key)  // 1 2 3 4 5
  }
}
foo(1,2,3,4,5)


// ------------------ 遍历对象 --------------
const obj = {
  data:['hello', 'world'],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if(index < self.data.length) {
          return {
            value: self.data[index++],
            done:false
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
for(let v of obj){
  console.log('obj-v:', v)  // hello  world
}

// ------------ 类数组对象可以部署数组的Symbol.iterator --------------
// 普通对象部署数组的 Symbol.iterator没有效果
const arrayLike = {
  0:'hello',
  1:'world',
  length:2,
  [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
for(let item of arrayLike){
  console.log('array-like-item', item)  // hello world
}

const _object = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
for(let item of _object){
  console.log('_object-item', item) // undefined  undefined undefined
}

// 给一个普通对象部署 遍历接口
const object = {
  firstName:'kyrie',
  lastName:'irving',
  age:30,
}
/* for(let value of object){ // object is not iterable
  console.log(value)
} */
object[Symbol.iterator] = function(){
  const _this = this;
  const keys = Object.keys(this)
  let nextIndex = 0;
  return {
    next:function() {
      if(nextIndex < keys.length) {
        return {
          value:_this[keys[nextIndex++]],
          done:false
        }
      }else{
        return {
          value:undefined,
          done:true
        }
      }
    }
  }
}
for(let item of object){
  console.log(item) // kyrie irving 30
}

// ------------ 调用Iterator接口的场合 ------------
// 1. 解构赋值
const _set = new Set().add('a').add('b').add('c')
const [x, y] = _set;
console.log('x,y', x, y)  // a, b
const [first, ...rest] = _set;
console.log('first',first, rest)  // a ,[b,c]

// 2 ... 扩展运算符
const str = 'hello world'
console.log([...str]);


// 3. yield*  yield*后面跟的是一个可遍历结构,会调用该结构的遍历器接口。
const generator = function* (){
  yield 1;
  yield * [2,3,4]
  yield 5
}
const iterator = generator()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
/*
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: 5, done: false }
*/


// ---------- 给对象一个遍历器接口 ----------
const player = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30
}

function* entry(object){
  for(let key of Object.keys(object)){
    yield [key, object[key]]
  }
}
for(const [key,value] of entry(player)){
  console.log('key,', key, 'value:', value)
}
/*
key, firstName value: kyrie
key, lastName value: irving
key, age value: 30
*/


// ------------ for..of遍历数组 跳出循环 ---------
// forEach 无法跳出循环
const number_array = [1,2,3,4,5,6,7,8,9,10];

for(let number of number_array){
  if(number > 5) {
    break;
  }
  console.log('number', number)
}

for(let key in number_array){
  if(number_array[key] > 5){
    break;
  }
  console.log('number', key)
}
