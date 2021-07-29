// return promise
function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve,ms,'done')
  })
}

timeout(2000).then(value => {
  console.log('value:',value)
})


// promise执行顺序
let promise = new Promise(resolve => {
  console.log('Promise')
  resolve()
})
promise.then(() => {
  console.log('resolved')
})
console.log('Hi')
/*
Promise
Hi 
resolved
*/ 


// promise的状态改变了就不会改变
const p1 = new Promise((resolve,reject) => {
  resolve('hello');
  reject(new Error('error,promise rejected'))
})
p1.then(value => {
  console.log('value:',value)
}).catch(err => {
  console.log('err:',err)
})

const p2 = new Promise((resolve,reject) => {
  reject('err,promise rejected')
  resolve('hello')
})
p2.then(value => {
  console.log('value:',value)
}).catch(err => {
  console.log('err:',err)
});


// 懒加载图片
// function loadImageAsync(url) {
//   return new Promise((resolve,reject) => {
//     const image = new Image();
//     image.onload = function(){
//       resolve(image)
//     }
//     image.onerror = function(){
//       reject(new Error('Could not load image at' + url))
//     }
//     image.src = url;
//   })
// }
// loadImageAsync('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-193cbb243dc14d3a016caaa54ba02837_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630162244&t=a1165a8ef8e3f5ddf04b5f6f603088cf')
// .then(img => {
//   console.log(img)
// })