// promise内部的错误
const p1 = new Promise((resolve) => {
  resolve(x + 1)
})
p1.then(v => {
  console.log('v:',v)
}).catch(err => {
  console.log('promise内部的错误:', err.message)
})


const p2 = new Promise((resolve,reject) => {
  reject(new Error('test error'))
})

const p3 = new Promise((resolve,reject) => {
  setTimeout(() => {
    reject('setTimeout error')
  },0)
})

p3.catch(err => {
  console.log('捕获setTimeout错误:', err)
})

setTimeout(() => {
  console.log('setTimeout')
},1000)