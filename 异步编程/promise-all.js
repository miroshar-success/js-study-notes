// --------------------- Promise.all([promise1,promise2,promise3]) ------------------
// 参数必须具有Iterator接口,不一定要数组


// ------------------ 3个promise都正常返回 -----------------
const p1 = new Promise(resolve => {
  resolve('hello,p1')
})
const p2 = new Promise(resolve => {
  resolve('hello,p2')
})
const p3 = new Promise(resolve => {
  resolve('hello,p3')
})

Promise.all([p1,p2,p3]).then(([v1,v2,v3]) => {
  console.log(v1, v2, v3) // hello,p1  hello,p2,  hello,p3
})

// ----------------- 其中一个promise失败 -----------------
const p4 = new Promise(resolve => resolve('p4'))
const p5 = new Promise((resolve,reject) => reject('error, p5'))
const p6 = new Promise(resolve => resolve('p6'))
Promise.all([p4,p5,p6]).then(([v4,v5,v6]) => {
  console.log('v4:', v4, 'v5:', v5, 'v6:', v6)  // 此处不会输出
}).catch(err => {
  console.log('error', err) // 会捕获到错误
})



// -------------------- 其中一个promise定义了 catch方法 -------------------
const p7 = new Promise((resolve,reject) => {
  reject('error p7')
}).catch(err => {
  console.log(err)
})

const p8 = new Promise((resolve) => {
  resolve('p8')
})
Promise.all([p7,p8]).then(([v7,v8]) => {
  console.log(v7, v8) // undefined, p8
}).catch(err => {
  console.log('可以捕获到error吗', err) // 无法捕获错误,因为p7有自己定义到catch
})



// ------------------------ try -catch 捕获 Promise.all 错误 -------------------------
const f1 = () => {
  return new Promise(resolve => {
    resolve('f1')
  })
}
const f2 = () => {
  return new Promise((resolve,reject)=> {
    reject('我报错了')
  })
}

async function get_error() {
  try {
    const [f_1, f_2] = await Promise.all([f1(), f2()])
    console.log('f1',f_1, 'f2',f_2)
  }catch(err){
    console.log('promise-all', err)
    return
  }
  console.log('我还会执行吗?')
}
get_error()
