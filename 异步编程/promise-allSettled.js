// ------------------------- Promise.allSettled -----------------------------
// 所有异步操作都结束了, 不算成功或者 失败(包含fulfilled和rejected)两种情况

const resolved = Promise.resolve(42)
const rejected = Promise.reject(-1)

Promise.allSettled([resolved, rejected]).then((result) => {
  console.log('result', result)
})
/*
result [
  { status: 'fulfilled', value: 42 },
  { status: 'rejected', reason: -1 }
]
*/


// ---------- allSettled 实现 --------

function has_iterator(data){
  return typeof data[Symbol.iterator] === 'function';
}

function allSettled(promiseArray){
  return new Promise((resolve) => {
    if(!has_iterator(promiseArray)){
      return reject(new TypeError('参数没有iterator接口'))
    }
    const temp = [];
    let count = 0;
    for(let promise of promiseArray){
      Promise.resolve(promise).then(v => {
        temp.push({
          status:'fulfilled',
          value:v
        })
      }).catch(err => {
        temp.push({
          status:'rejected',
          reason: err
        })
      }).finally(() => {
        count += 1;
        if(count === promiseArray.length ){
          resolve(temp)
        }
      })
    }
  })
}

const p1 = new Promise((resolve) => {
  resolve('p1')
})
const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve('p2')
  }, 2000)
})
const p3 = new Promise((resolve,reject) => {
  setTimeout(() => {
    reject('error')
  },1000)
})

allSettled([p1,p2,p3]).then(v => {
  console.log('allSettled-value:', v)
  /*
   [
    { status: 'fulfilled', value: 'p1' },
    { status: 'rejected', reason: 'error' },
    { status: 'fulfilled', value: 'p2' }
  ]
  */
})
