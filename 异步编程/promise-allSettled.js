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
