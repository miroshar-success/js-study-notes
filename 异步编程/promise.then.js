// --------------- then方法返回一个新的Promise实例 ---------------
const promise_1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('promise')
  },1000)
})

const promise_2 = promise_1.then(value => {
  console.log(value)  // promise
})

console.log(promise_1 === promise_2)  // false


// ----------------------- Promise链式调用 --------------------
const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('我是p1')
  },2000)
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve('我是p2')
  },3000)
})
p1.then(() => {
  return p2
}).then(v => {
  console.log(v)
})



// ------------------------- then链式调用回调函数的参数 ---------------------------
const p3 = new Promise(resolve => resolve('hello world'))
p3.then(v => {
  console.log('v3', v)  // hello world  1
}).then(v => {
  console.log('v4', v)  // undefined  4
}).then(v => {
  console.log('v5', v)  // undefined  6
})

p3.finally((v) => {
  console.log('finally-', v)  // undefined  2
}).then(v => {
  console.log('finally-later', v) // hello world  7
})


p3.then(v => {
  console.log('finally-before', v)  // undefined  3
}).finally((v) => {
  console.log('finally', v) // undefined  5
}).then(v => {
  console.log('finally-after', v) // undefined  8
})
