/*
Promise.prototype.catch() 是Promise.prototype.then(null,rejection) 或
Promise.prototype.then(undefined, rejection)的别名
*/ 
const promise = new Promise((resolve,reject) => {
  try {
    throw new Error('test')
  }catch(err) {
    console.log('err:', err)
    // reject(err)
    resolve('error message')
  }
})

promise
.then(res => {
  console.log('res:', res)
})
.catch(function(error){
  console.log('error:', error)
})


// promise状态一旦发生改变,就不会再改变了
const p1 = new Promise((resolve,reject) => {
  resolve('ok')
  throw new Error('test')
})
p1.then(value => {
  console.log('value:',value)
})
.catch(err => {
  console.log('捕获到错误没:', err)
})


/*
promise内部的错误不会传递到外出,不会退出进程终止脚本执行
*/ 
const someAsyncThing = function() {
  return new Promise(resolve => {
    resolve(x + 1)
  })
}

someAsyncThing().then(value => {
  console.log('value:', value)
})
.catch(err => {
  console.log('err', err.message)
})
// // 没有捕获错误的话 2s后会输出 执行setTimeout
// setTimeout(() => {
//   console.log('执行setTimeout')
// },2000)



// 下一轮事件循环 再抛出错误
const p2 = new Promise((resolve,reject) => {
  resolve('ok')
  setTimeout(() => {
    throw new Error('test error')
  },0)
})
p2.then(v => {
  console.log(v)
}).catch((err) => {
  console.log(err)
})
