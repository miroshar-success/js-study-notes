console.log('----------------async---------------')
const promise_fn = (n) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(n)
    }, 1000)
  })
}

promise_fn(1)
  .then(res => {
    console.log(res)
    return Promise.resolve(123)
  })
  .then((res) => {
    console.log(res)
    return Promise.resolve(456)
  })
  .then((res) => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })

const load_image = () => {
  const url = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F30%2F20210730164800_1e789.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1684590571&t=c437ac56f6d30b1dd2bfea4515eab331'
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject(new Error(`图片加载失败 ${url}`))
    }
    img.src = url
  })
}

load_image().then(img => {
  img.width = 300
  document.body.appendChild(img)
  return img
}).then((img) => {
  console.log('height:', img.height)
})

Promise.resolve().then(() => {
  console.log('---------------- promise 练习-----------------')
  console.log(1)
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).finally(() => {
  console.log('--------------- promise 练习结束 ---------------')
})

Promise.resolve().then(() => {
  console.log(1)
  throw new Error('promise error')
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
}).then(() => {
  console.log(5)
})
// ---------------- 宏任务和微任务 --------------
setTimeout(() => {
  console.log(200)
}, 0)
Promise.resolve().then(() => {
  console.log(300)
})
console.log(400)
// 400 ----- 300 ------- 200

async function async1 () {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(() => {
  console.log('setTimeout')
}, 0)
async1()

new Promise(resolve => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})
console.log('script end')

/***
 * 1. script start
 * 2. async1 start
 * 3. async2
 * 4. promise1
 * 5. script end
 * 6. async1 end
 * 7. promise2
 * 8. setTimeout
 */

// -----------------------then可以一直执行 ----------------------
Promise.resolve().then(() => {
  console.log(11)
  throw new Error('error-1')
}).catch(() => {
  console.log(22)
}).then(() => {
  console.log(33)
}).then(() => {
  console.log(44)
}).then(() => {
  console.log(55)
}).finally(() => {
  console.log(66)
}).then(() => {
  console.log(77)
})

// ----------------------- catch -------------------------
!(async function() {
  const promise = Promise.reject('error')
  const result = await promise
  console.log('res', result)
})

/* console.time('10000')
for (let i = 0; i < 100000; i++) {
  console.log(i)
}
console.timeEnd('10000') */

const multiple = (number) => {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(number * number)
    }, 1000)
  })
}
// 基本同时输出
[1,2,3,4,5].forEach(async (number) => {
  const res = await multiple(number)
  // console.log(res)
});
(async () => {
  for (number of [1,2,3, 4, 5]) {
    const res = await multiple(number)
    console.log(res)
  }
})()

// ---------------- await阻塞 ------------------
const f1 = async () => {
  const result = await new Promise(resolve => {
    setTimeout(() => {
      resolve('hello')
    }, 1000)
  })
  console.log(result)
}
f1()
console.log('我可以执行吗') // 先执行(不会因为f1的执行需要等待)