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

// promise的报错被自己catch,则promise.all 不会捕获错误, 接收到到值为undefined.
const p7 = new Promise(resolve => {
  resolve('p7')
}).then(result => result)
.catch(e => e)

const p8 = new Promise((resolve,reject) => {
  reject(new Error('p8 error'))
}).then(result => result)
.catch(err => {
  console.log('p8自己捕获error:',err)
})
Promise.all([p7,p8]).then(v => {
  console.log('p7-p8',v)
}).catch(err => {
  console.log('p7-p8-error:', err)
})


// promise.race   只要有一个返回了数据就可以,返回的数据不是数组
const p9 = new Promise(resolve => {
  setTimeout(() => {
    resolve('请求结束')
  },3000)
})

const p10 = new Promise((resolve,reject) => {
  setTimeout(() => {
    reject(new Error('请求超时'))
  },2000)
})
Promise.race([p9,p10]).then(v => {
  console.log('p9-p10:', v)
})


// Promise.allSettled,不管是全部fulfilled还是rejected
const promise1 = new Promise((resolve,reject) => {
  reject(new Error('p1报错了'))
})
const promise2 = new Promise((resolve,reject) => {
  resolve('p2')
})
const promise3 = new Promise((resolve,reject) => {
  reject(new Error('p3报错了'))
})
const promise4 = new Promise((resolve,reject) => {
  reject(new Error('p4报错了'))
})
Promise.allSettled([promise1,promise2,promise3]).then(value => {
  console.log('value:', value)
})
// 返回值格式为 
/*
[
  {status:fulfilled,value:123},
  {status:rejected,reason:}
]
*/ 

// Promise.any() 有一个变成fulfilled状态,就会变成fulfilled, 所有都变成rejected,包装实例就会变成rejected.
Promise.any([promise1,promise4,promise3]).then(v => {
  console.log('any-value:', v)
}).catch((err) => {
  console.log('any-error:', err)
})