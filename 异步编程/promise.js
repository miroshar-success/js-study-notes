// // return promise
// function timeout(ms) {
//   return new Promise(resolve => {
//     setTimeout(resolve,ms,'done')
//   })
// }

// timeout(2000).then(value => {
//   console.log('value:',value)
// })


// // promise执行顺序
// let promise = new Promise(resolve => {
//   console.log('Promise')
//   resolve()
// })
// promise.then(() => {
//   console.log('resolved')
// })
// console.log('Hi')
// /*
// Promise
// Hi 
// resolved
// */ 


// // promise的状态改变了就不会改变
// const p1 = new Promise((resolve,reject) => {
//   resolve('hello');
//   reject(new Error('error,promise rejected'))
// })
// p1.then(value => {
//   console.log('value:',value)
// }).catch(err => {
//   console.log('err:',err)
// })

// const p2 = new Promise((resolve,reject) => {
//   reject('err,promise rejected')
//   resolve('hello')
// })
// p2.then(value => {
//   console.log('value:',value)
// }).catch(err => {
//   console.log('err:',err)
// });


// // 懒加载图片
// // function loadImageAsync(url) {
// //   return new Promise((resolve,reject) => {
// //     const image = new Image();
// //     image.onload = function(){
// //       resolve(image)
// //     }
// //     image.onerror = function(){
// //       reject(new Error('Could not load image at' + url))
// //     }
// //     image.src = url;
// //   })
// // }
// // loadImageAsync('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-193cbb243dc14d3a016caaa54ba02837_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630162244&t=a1165a8ef8e3f5ddf04b5f6f603088cf')
// // .then(img => {
// //   console.log(img)
// // })


// console.log(new Date())
// // promise封装ajax
// function ajax(url){
//   const xhr = new XMLHttpRequest()
//   xhr.open('GET', url, true)
//   xhr.responseType = 'json'
//   xhr.send(null)
//   return new Promise(resolve => {
//     xhr.onload = function() {
//       resolve(xhr.response)
//     }
//   })
// }

// // ajax('http://apis.juhe.cn/simpleWeather/query?city=hangzhou')
// // .then(res => {
// //   console.log('res:', res)
// // })


// const promise1 = new Promise(resolve => {
//   resolve('hello')
// })
// const promise2 = new Promise(resolve => {
//   resolve('world')
// })
// Promise.all([promise1,promise2]).then(result => {
//   console.log(result);
// })


const promise3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hello world')
  },3000)
})
const promise4 = new Promise((resolve,reject) => {
  setTimeout(() => {
    reject('请求超时')
  },4000)
})
Promise.race([promise3,promise4]).then((v) => {
  console.log(v)
})
.catch((err) => {
  console.log(err)
})

Promise.allSettled([promise3,promise4]).then(v => {
  console.log(v)
  // [
  //   { status: 'fulfilled', value: 'hello world' },
  //   { status: 'rejected', reason: '请求超时' }
  // ]
})

const promise_prototype = new Promise((resolve,reject)=>{

})
console.log(promise_prototype)


const promise5 = new Promise((resolve) => {
  resolve('promise5')
})
const promise6 = Promise.resolve(promise5).then(v => {
  console.log(v)
})

console.log(promise6 === promise5)  // false


console.log('global start')
setTimeout(() => {
  console.log('world')
},0)
Promise.resolve('hello').then(v => {
  console.log('hello')
})
console.log('global end')