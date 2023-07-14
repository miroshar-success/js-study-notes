// ------------ promise ----------------
Promise.resolve()
.then(() => {
  console.log(0)
  return Promise.resolve(4)
}).then(res => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})
// 0 1 2 3 4 5 6

// promise.then() 中返回一个 promise 会 '慢两拍', then() 会交替执行
// 1. promise需要由pending变为fulfilled
// 2. then函数挂载到MicroTaskQueue上

let a = { n: 1 }
let b = a
a.x = a = { n: 2 }

console.log(a.x, b.x) // undefined, { n: 2 }

// . 比赋值的优先级更高