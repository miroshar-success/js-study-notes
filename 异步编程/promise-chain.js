function m1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('hello');
    },1000)
  })
}

function m2() {
  return new Promise(resolve => {
    setTimeout(resolve,1000,'world');
  })
}

function m3() {
  return new Promise(resolve => {
    setTimeout(resolve,1000,'!');
  })
}
// 前面then 方法中回调函数的返回值回作为后面then方法回调的参数。
m1()
.then(value => {
  console.log(value)
  return m2()
})
.then(value => {
  console.log(value)
  return m3()
})
.then(value => {
  console.log(value)
  return '你好,世界'
})
.then(value => {
  console.log(value)
})
.then(value => {
  console.log(value)
})


const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('东京')
  },3000)
})
// then方法返回的是一个新的promise实例,因此可以采用链式写法
const promise2 = new Promise(resolve => {
  // resolve(promise1)
  // resolve('奥运')
  setTimeout(() => {
    resolve(promise1)
  },1000)
})

// promise2.then(v => {
//   console.log(v)  // 东京
//   return promise1
// }).then( v => {
//   console.log(v)
// })
promise2.then(result => {
  console.log('result:', result)
})
.catch(error => {
  console.log('error:', error)
})


// catch捕获的错误
new Promise((resolve,reject) => {
  return reject(new Error('报错了'))
})
.then((v) => {
  console.log('v:',v);
  return new Promise((resolve) => {
    resolve('你捕获不到错误');
  })
},err => {
  console.log('errrrr:',err)
})
.catch(err => {
  console.log('err:',err)
});

// catch 可以捕获上一个then方法的错误
new Promise((resolve,reject) => {
  return reject('hhh');
})
.then(() => {
  return Promise.reject(new Error('error again'))
},(err) => {
  console.log('hhh:',err) // 回调函数捕获Promise的回调函数里的错误
}).catch(err => {
  console.log('我捕获到你了', err) // 优先捕获Promise回调函数里抛出的错误
})