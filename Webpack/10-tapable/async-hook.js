const {AsyncParallelHook, AsyncParallelBailHook, AsyncSeriesHook } = require('tapable')

// ---------------------------- AsyncParallelHook ------------------------ 并行
// const hook = new AsyncParallelHook(['name'])
/* hook.tap('m1', function(name) {
  console.log('m1:',name)
})

hook.tap('m2', function(name){
  console.log('m2:', name)
})

hook.callAsync('kyrie', function() {
  console.log('回调执行成功')
  // m1 kyrie m2 kyrie
}) */
// ----------- tapAsync
/* hook.tapAsync('m3', function(name,callback){
  setTimeout(() => {
    console.log('m3',name)
    callback()
  },2000)
})
hook.tapAsync('m4', function(name,callback){
  setTimeout(() => {
    console.log('m4', name)
    callback()
  },1500)
})
hook.callAsync('lebron',function(){
  console.log('hello') // 先执行的console, 再执行
}) */

// ------------tapPromise-----------
/* console.time('time')
hook.tapPromise('m5', function(name) {
  return new Promise(resolve => {
    setTimeout(function(){
      resolve()
      console.log('m5')
    },3000)
  })
})
hook.tapPromise('m6', function(name) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
      console.log('m6')
    },2000)
  })
})
hook.promise('irving').then(() => {
  console.log('promise 执行完成');
  console.timeEnd('time')
}) */

// ---------------------------- AsyncParallelBailHook ------------------------ 并行
/* const hook = new AsyncParallelBailHook(['name'])
hook.tapAsync('m1', function(name,callback) {
  setTimeout(() => {
    console.log('m1:', name)
    callback()
  },1500)
})

hook.tapAsync('m2', function(name,callback) {
  setTimeout(() => {
    console.log('m2:', name)
    callback()
  },1800)
})

hook.tapAsync('m3', function(name,callback) {
  setTimeout(() => {
    console.log('m3', name)
    callback()
  },2000)
})

hook.callAsync('james', function() {
  console.log('执行完成')
})
 */

 // ------------------------------------ AsyncSeriesHook --------------------------------------
const hook = new AsyncSeriesHook(['name'])
console.time('time')
hook.tapPromise('f1', function(name) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('f1:', name)
      resolve()
    },2000)
  })
})
hook.tapPromise('f2', function(name){
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('f2', name)
      resolve()
    },1000)
  })
})
hook.callAsync('hello', function() {
  console.log('AsyncSeriesHook执行完成');
  console.timeEnd('time')
})
