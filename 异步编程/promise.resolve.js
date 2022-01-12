// ----------------- Promise.resolve() --------------------------
// 将现有对象转为Promise对象。

// ------------- 参数是一个Promise实例 ----------------
const p1 = new Promise(resolve => {
  resolve('p1')
})
const p2 = Promise.resolve(p1)
console.log(p1 === p2)  // true



// ----------------------- 参数是一个thenable对象 ------------------------
const thenable = {
  then(resolve){
    resolve('thenable')
  }
}
Promise.resolve(thenable).then(v => {
  console.log('v', v) // thenable
})

const thenable_2 = {
  then(callback) {
    setTimeout(() => {
      callback('setTimeout')
    },3000)
  }
}
Promise.resolve(thenable_2).then(result => {
  console.log('result', result) // setTimeout
})


// ----------------------- thenable对象抛出一个错误 -----------------------
const thenable_3 = {
  then(resolve,reject) {
    reject(new Error('thenable对象的错误'))
  }
}
Promise.resolve(thenable_3).then().catch(err => {
  console.log('err', err) // err Error: thenable对象的错误
})


// ----------------------- (原始值/function/object没有then方法) --------------------------
Promise.resolve(true).then(v => {console.log(v)}) // true
Promise.resolve('hello world').then(v => {console.log(v)})  // hello world
Promise.resolve(123).then(v => {console.log(v)})  // 123
Promise.resolve({}).then(v => {console.log(v)}) // {}
Promise.resolve([]).then(v => {console.log(v)}) // []
Promise.resolve(undefined).then(v => {console.log(v)})  // undefined
Promise.resolve(null).then(v => {console.log(v)}) // null
Promise.resolve(Symbol('foo')).then(v => {console.log(v)})  // Symbol('foo')
Promise.resolve(() => {}).then(v => {console.log(v)}) // [Function (anonymous)]


// ----------------------------- 不带有任何参数 -----------------------------
const p = Promise.resolve() // 直接返回一个resolved状态的Promise对象。
// 立即promise.resolve()的promise对象，是在本轮事件循环的结束执行,而不是在下一轮事件循环开始时候

setTimeout(() => {
  console.log('three')
},0)
Promise.resolve().then(function(){
  console.log('two')
})
console.log('one')  // one two three
