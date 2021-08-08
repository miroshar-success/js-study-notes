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


// setTimeout(function timer1(){
//   new Promise(resolve => {
//     console.log('hello-1111')
//   })
//   console.log('hello-22222')
// },1000)

setTimeout(() => {
  console.log('你好')
},1000)

new Promise((resolve) => {
  setTimeout(() => {
    resolve('世界')
  },1000)
}).then(v => {
  console.log(v)
})

async function t2(){
  const a = await new Promise((resolve) => {})
  console.log('a',a)  // 不会执行,因为promise的状态没有改变
}
t2()