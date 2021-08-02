const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('hello')
  },2000)
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve('world')
  })
})

// Promise.all
Promise.all([p1,p2]).then(res => {
  const [v1,v2] = res;
  console.log(v1,v2)
})

// 其中一个promise 报错
const p3 = new Promise((resolve) => {
  setTimeout(() => {
    return resolve('你好,世界')
  },2000)
})
const p4 = new Promise((resolve,reject) => {
  setTimeout(() => {
    return reject(new Error('wrong message'))
  },1000)
})
Promise.all([p3,p4]).then((v) => {
  console.log('v:', v)
}).catch((err) => {
  console.log('err:', err.message)
})


// 两个promise报错, 只会捕获一个错误
const p5 = new Promise((resolve,reject) => {
  reject(new Error('what'))
})
const p6 = new Promise((resolve,reject) => {
  reject(new Error('fuck'))
})
Promise.all([p5,p6]).then(v => {
  console.log('both:', v)
}).catch(e => {
  console.log('both:', e.message)
})