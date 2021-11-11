const oButton = document.getElementById('button');

oButton.addEventListener('click', function(event) {
  // event.preventDefault()
  console.log('button - click')
},{
  passive:true, // 设置为true时不会调用event.PreventDefault()
  once:false,  // 只会监听一次
  capture:false  // 捕获阶段传递过来
})

document.addEventListener('click', function() {
  console.log('document - click')
}, {
  capture:true
})

window.addEventListener('click', function() {
  console.log('window - click')
}, {
  capture:true
})

/* // --------------------- fullscreenchange ---------------------
document.addEventListener('fullscreenchange',(event) => {
  console.log(event)
})
 */

 // -------------- 判断浏览器是否支持 第三个参数为options 对象
 let passiveSupport = false;
 const options = Object.defineProperty({}, 'passive' ,{
   get(){
     passiveSupport = true
   }
 })
window.addEventListener('test', null, options)
console.log(passiveSupport)


// ----------------- 同个元素监听相同事件 -----------------
const button = document.querySelector('.button')

button.addEventListener('click',function(){
  console.log('hello')
  console.log('function-this:',this)
},false)
button.addEventListener('click',() => {
  console.log('world')
  console.log('arrow-function-this:', this)
},false)


function handleInlineClick(arguments){
  console.log(this)
}
