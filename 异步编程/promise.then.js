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
