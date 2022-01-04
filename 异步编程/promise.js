// ----------------- Promise构造函数 基本使用 --------------------
function timeout(ms) {
  return new Promise((resolve,reject) => {
    setTimeout(resolve, ms, 'done')
  })
}

timeout(1000).then(value => {
  console.log('value', value) // done
},function(err) {
  console.log(err)
})


// --------------------- Promise新建后就会立即执行 -------------------
const promise = new Promise((resolve,reject) => {
  console.log('promise')
  resolve()
})
promise.then(function(value){
  console.log(value)  // undefined
})


// ---------------- Promise 返回一个promise ------------------
const p1 = new Promise((resolve,reject) => {
  setTimeout(() => {
    reject(new Error('fail'))
  }, 3000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(p1)
  }, 1000)
})

p2.then(result => {console.log(result)})
.catch(error => {console.log(error)})



// -------------- resolve 返回一个 promise ---------------
const p3 = new Promise(resolve => {
  setTimeout(() => {
    resolve('p3')
  },3000)
})
const p4 = new Promise(resolve => {
  setTimeout(() => {
    resolve(p3)//p3是一个promise, p4的状态无效了
  },1000)
})

p4.then(value => {
  console.log('p4', value)  // p3
})
p3.then(value => {
  console.log('p3', value)
})


// ----------- ------------
const p5 = new Promise(resolve => {
  setTimeout(() => {
    resolve('p5')
  },1000)
})
const p6 = new Promise(resolve => {
  setTimeout(() => {
    resolve(p5)
  },3000)
})
p6.then(value => {
  console.log('p6', value)  //p5
})
