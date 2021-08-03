console.log('global-start')
// 宏任务 / 微任务
setTimeout(() => {
  console.log('s2')
},0)
setTimeout(() => {
  console.log('s1')
},0)

Promise.resolve()
.then(() => {
  console.log('p1')
})
.then(() => {
  console.log('p2')
})

console.log('global-end')