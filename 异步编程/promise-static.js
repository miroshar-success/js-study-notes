// //  promise的静态方法
// const promise1 = new Promise(resolve => {
//   resolve('hello world')
// })

// const promise = Promise.resolve(promise1)

// console.log(promise === promise1) // true


// const p = Promise.reject('error')
// p.then(v => {
//   console.log('v:',v)
// }).catch(e => {
//   console.log(e)
// });

// // finally 最后执行的操作, 但是finally 不接受参数
// const p1 = new Promise((resolve,reject) => {
//   resolve('你好,世界')
// })
// p1.then(v => {
//   console.log(v)
// }).finally((v) => {
//   console.log('finally:', v)  // undefined
//   console.log('执行结束1')
// });

// // finally 返回的也是一个promise
// const p_finally = p1.finally(v => {
//   console.log('finally:', v)
//   console.log('执行结束2')
// }).then(v => {
//   console.log('finally-value:', v)
// })
// console.log(p_finally, typeof p_finally);

// // 封装finally方法, 执行完返回一个promise
Promise.prototype.my_finally = function(callback){
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {throw reason})
  )
}
// const p2 = new Promise((resolve,reject) => {
//   reject('你错了');
// })
// p2.then(v => {

// }).finally((v) => {

// }).catch(err => {
//   console.log('捕捉到了吗:', err, err.message);  // undefined
// })
Promise.prototype.v_finally = function(callback) {
  return this.then(
    value => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => {throw reason})
  )
}

const check_promise = new Promise((resolve,reject) => {
  resolve('hello,检测promise');
})
check_promise.v_finally(() => {
  console.log('执行了finally')
}).then(v => {
  console.log('check-result:',v)
})

check_promise.finally(() => {
  console.log('正常的finally')
}).then(v => {
  console.log('v:', v)
})