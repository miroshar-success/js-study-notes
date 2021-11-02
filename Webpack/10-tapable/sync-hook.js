const { SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook } = require('tapable')

// ------------------------- SyncHook 钩子互不影响 --------------------------------
/* const hook = new SyncHook(['name','age'])
hook.tap('m1',function(name,age){
  console.log('m1-call',name,age)
})

hook.tap('m2',function(name,age){
  console.log('m2-call:', name, age)
  return '123'
})

hook.tap('m3',function(name,age){
  console.log('m3-call:', name, age)
})

hook.call('kyrie','30') */

// --------------------------------  SyncBailHook --------------------------------
/* const hook = new SyncBailHook(['name', 'age'])
hook.tap('m1', function(name,age){
  console.log('m1', name,age)
})
hook.tap('m2',function(name,age){
  console.log('m2', name,age)
  // return '123'
  // return undefined
  return null
})
hook.tap('m3',function(name,age){
  console.log('m3',name,age)
})
hook.call('lebron',36) */
/*
第二个函数监听 return 非undefined时 会阻止 后面的代码执行
*/

// ------------------------------------  SyncWaterfallHook --------------------------------
/* const hook = new SyncWaterfallHook(['name','age'])

hook.tap('m1',function(name,age){
  console.log('m1:', name,age)
  return 'hello'
})

hook.tap('m2',function(name,age){
  console.log('m2:',name, age)
})

hook.tap('m3',function(name,age){
  console.log('m3:',name,age)
})

hook.call('curry',33) */
/*
当前一个注册函数有返回值时,会返回给下一个函数接收
*/

// --------------------------------------- SyncLoopHook ----------------------------------
const hook = new SyncLoopHook(['name','age'])
let count1 = 0, count2 = 0, count3 = 0;
hook.tap('m1',function(name,age) {
  console.log('m1:', name, age)
  count1 += 1;
  if(count1 == 2){
    count1 = 0;
    return undefined;
  }
  return true;
})

hook.tap('m2', function(name,age){
  console.log('m2:', name, age)
  /*如果条件不满足,会从头开始执行*/
  count2 += 1;
  if(count2 == 3) {
    count2 = 0;
    return undefined;
  }
  return true
})

hook.tap('m3', function(name,age) {
  console.log('m3:', name, age)
})

hook.call('chen',18)
