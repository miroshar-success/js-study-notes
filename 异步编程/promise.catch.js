// ---------------------- Promise.prototype.catch() ----------------------
// Promise.prototype.catch() 是 Promise.prototype.then(null, rejection)的别名

// ---------------- promise内部 抛出错误 ------------
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('我报错了'))
    },ms)
  })
}
timeout(1000).then(() => {

}).catch(err => {
  console.log(err)  // 会输出错误
})


// ------------------ then回调函数抛出异常 --------------
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms, 'hello world')
  })
}
sleep(1000).then((v) => {
  console.log('v', v)
  throw new Error('then 里面报错了')
}).catch(err => {
  console.log(err)
})

// ----------------------- promise状态已经改变 再抛出错误 ----------------------
const p1 = new Promise((resolve,reject) => {
  resolve('hello, promise')
  throw new Error('状态改变后的错误')
})
p1.then(v => {
  console.log('v1',v)
}).catch(err => {
  console.log(err)
})


// ------------------- Promise对象内部的错误不会传递到外层代码 --------------------
function test() {
  return new Promise(resolve => {
    resolve(x + 2)
  })
}
test().then(() => {
  console.log('everything is great')
}).catch(err => {
  console.log('我能捕获到错误吗?', err)
})
setTimeout(() => {
  console.log(123)
},3000)
// x is not defined
// 123
/* process.on('unhandledRejection', function(err) {
  console.log(err)
}) */
