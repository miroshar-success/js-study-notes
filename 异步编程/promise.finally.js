// ES2018 引入标准
// -------------------------- Promise.prototype.finally -------------------------

// fulfilled
function test() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('hello, finally')
    },1000)
  })
}

test().then(v => {
  console.log(v)
}).catch(err => {
  console.log(err)
}).finally(() => {
  console.log('执行成功了')
})


// rejected
function timeout() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      reject('error')
    },1000)
  })
}
timeout().then(() => {
  console.log('正常运行')
}).catch(err => {
  console.log(err)
}).finally(() => {
  console.log('执行完成')
})

// ----------------- finally的返回值 还是一个promise，可以接着.then ------------------
const p1 = new Promise(resolve => resolve('123'))
p1.then(v => {
  console.log('p1', v)
}).catch(() => {
  console.log('catch')
}).finally(() => {
  console.log('haha')
}).then((v) => {
  console.log('我在finally之后',v)  //v： undefined
})

p1.finally(() => {
  console.log('第二个finally')
}).then(v => {
  console.log('第二个v', v) // 123
})


// -------------------- finally回调里异步函数 ---------------
const p2 = new Promise(resolve => resolve('456'))
p2.finally((v) => {
  setTimeout(() => {
    console.log('finally-v:', v)  // v:undefined
  },1000)
}).then(v => {
  console.log('1s later', v)  // 456
})


//------------------------- 实现finally -----------------------
Promise.prototype._finally = function(callback) {
  const P = this.constructor;
  return P.then(
    value => {
      //  callback 可能是一个异步, Promise.resolve()可以保证在异步函数执行之后 再将value返回
      // 如果finally前面没有调用then, 此时将value返回，如果之前调用了then，则此处value 为undefined
      console.log('value', value)
      Promise.resolve(callback()).then(() => {
        return value
      })
    },
    reason => {
      console.log('reason', reason)
      Promise.resolve(callback()).then(() => {
        throw reason
      })
    }
  )
}

