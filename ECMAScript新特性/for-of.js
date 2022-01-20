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
