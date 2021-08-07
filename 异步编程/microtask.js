console.log('global-start')
// 宏任务 / 微任务
setTimeout(() => {
  console.log('s2')
},0)
setTimeout(() => {
  console.log('s1')
},0)

Promise.resolve()
.then(() => {
  console.log('p1')
})
.then(() => {
  console.log('p2')
})

console.log('global-end')

const p1 = new Promise((resolve,reject) => {
  setTimeout(() => {
    reject(new Error('fail'))
  },3000)
})
const p2 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve(p1)
  },1000)
})
p2.then(result => {console.log(result)})
.catch((err) => {console.log(err)})


const promise1 = new Promise((resolve) => {
  resolve('hello')
})
const promise2 = new Promise((resolve) => {
  resolve('world')
})
const promise3 = new Promise((resolve) => {
  resolve('!')
})
Promise.resolve()
.then(() => {
  return promise1
}).then((v) => {
  console.log(v)
  return promise2
}).then((v) => {
  console.log(v)
  return promise3
}).then(v => {
  console.log(v)
})