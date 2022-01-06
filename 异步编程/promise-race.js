// ---------------- Promise.race() -----------------
/*
只要有一个 实例状态改变了, p的状态就会改变
const p = Promise.race([p1,p2,p3])
*/

// -------------------------------- 请求超时 ------------------------------
const fetch_data = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          firstName:'kyrie',
          lastName:'irving'
        },
        {
          firstName:'lebron',
          lastName:'james'
        }
      ])
    }, 5000)
  })
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms, '超时了'))

Promise.race([fetch_data(), wait(3000)]).then(result => {
  console.log(result)
}).catch(err => {
  console.log(err)
})
