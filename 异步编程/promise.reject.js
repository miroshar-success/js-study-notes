// ------------------ Promise.reject()方法也会返回一个新的Promise实例,该实例状态为rejected ---------------------
const p = Promise.reject('出错了')
p.then(null,(err) => {
  console.log(err)
})


const p2 = Promise.reject(new Error('出错了'))
p2.then(null, s => {
  console.log('s', s)
})
