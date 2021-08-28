// --------- 数组遍历
const player = ['kyrie','durant','james'];
for(let item of player){
  console.log('player:',item)
}
for(let key in player){
  console.log('key:', key)
}
// ------- arguments遍历
function sum() {
  for(let arg of arguments){
    console.log('arg:', arg)
  }
}
sum(1,2,3,4,5)

// --------------- map结构遍历
const map = new Map()
map.set('firstName','kyrie')
map.set('lastName', 'irving')
for(let [key,value] of map){
  console.log('map:', key, value)
}

// -------------- set
const set = new Set()
set.add('kyrie')
set.add('irving')
for(let value of set){
  console.log('set-value:', value)
}

// ------------- string
for(let value of 'hello world'){
  console.log('string-value:', value)
}

// --------------- ArrayLike
const iterable = {
  0:'a',
  1:'b',
  2:'c',
  3:'d',
  length:4,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for(let v of iterable){
  console.log('object-v:', v)
}
// --------------- 普通对象遍历部署iterator无效果
const object = {
  'firstName': 'kyrie',
  lastName: 'irving',
  age: 29,
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for(let v of object){
  console.log('v:', v)
}


// Promise的同步和异步
var resolvedPromiseArray = [Promise.resolve(33), Promise.resolve(44)]
const p = Promise.all(resolvedPromiseArray)
console.log('p:', p)

setTimeout(() => {
  console.log('the stack is now empty')
  console.log(p)
})

const empty_promise = Promise.all([])
console.log(empty_promise)

var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'one');
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'two');
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'three');
});
var p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, 'four');
});
var p5 = new Promise((resolve, reject) => {
  reject('reject');
});

Promise.all([p1, p2, p3, p4, p5]).then(values => {
  console.log(values);
}, reason => {
  console.log(reason)
});



const arr = ['1',2,3,4,5]
const iterator = arr[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())


const obj = {
  store:['hello','world','你好','世界'],
  [Symbol.iterator]:function() {
    let self = this, index = 0;
    return {
      next:function() {
        const result = {
          value: self.store[index],
          done:index >= self.store.length
        }
        index += 1;
        return result
      }
    }
  }
}
for(let v of obj){
  console.log('for-of-object:', v)
}


const todo = {
  learn:['vue','react','angular'],
  life:['吃饭','碎觉'],
  [Symbol.iterator]:function() {
    let todos = [...this.learn,...this.life], index=0;
    return {
      next:function() {
        let result = {
          value: todos[index],
          done:index >= todos.length
        }
        index += 1;
        return result;
      }
    }
  }
}

for(let t of todo){
  console.log('todo-item:', t)
}