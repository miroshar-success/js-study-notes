Promise.resolve()
.then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
})
.then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})


Promise.resolve()
.then(() => {
  console.log(10)
}).then(() => {
  console.log(20)
}).then(() => {
  console.log(30)
}).then(() => {
  console.log(40)
})
.then(() => {
  console.log(50)
}).then(() => {
  console.log(60)
})



Promise.resolve()
.then(() => {
  console.log(100)
}).then(() => {
  console.log(200)
}).then(() => {
  console.log(300)
}).then(() => {
  console.log(400)
}).then(() => {
  console.log(500)
}).then(() => {
  console.log(600)
})

/*
交替执行
1
10
100
2
20
200
3
30
300
4
40
400
*/


// ----------- promise 返回一个新的promise -------------
Promise.resolve()
.then(() => {
  console.log('a')
  return Promise.resolve('b')
}).then((res) => {
  console.log(res)
}).then(() => {
  console.log('c')
}).then(() => {
  console.log('d')
})
.then(() => {
  console.log('e')
})
// ---- 返回1个promise会慢两拍,  pending -> fulfilled   microtask queen event loop
