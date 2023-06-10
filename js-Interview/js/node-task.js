// Node的事件机制 (区分类型和优先级)
console.info('start')
setImmediate(() => {
  console.info('setImmediate')
})
setTimeout(() => {
  console.info('setTimeout')
})

Promise.resolve().then(() => {
  console.info('promise')
})

process.nextTick(() => {
  console.info('nextTick')
})
console.info('end')
/**
 * 1. start
 * 2. end
 * 3. nextTick
 * 4. promise
 * 5. setTimeout
 * 6. setImmediate
*/

// 宏任务  
// timers: -----> setTimeout setInterval
// I/O callbacks
// Check检查： setImmediate

// 微任务 process.nextTick 优先级最高 ---->  promise / async 


// 推荐使用 setImmediate 代替 process.nextTick