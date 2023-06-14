const oButton = document.getElementById('button');

oButton.addEventListener('click', function(event) {
  // event.preventDefault()
  console.log('button - click')
},{
  passive:true, // 设置为true时不会调用event.PreventDefault()
  once:false,  // 只会监听一次
  capture:false
})

document.addEventListener('click', function() {
  console.log('document - click')
}, {
  capture:false
})

window.addEventListener('click', function() {
  console.log('window - click')
}, {
  capture:false
})

 // -------------- 判断浏览器是否支持 第三个参数为options 对象 -------------------
 let passiveSupport = false;
 const options = Object.defineProperty({}, 'passive' ,{
   get(){
     passiveSupport = true
   }
 })
window.addEventListener('test', null, options)
console.log(passiveSupport) // true


// ----------------- 同个元素监听相同事件 -----------------
const button = document.querySelector('.button')

button.addEventListener('click',function(){
  console.log('hello')
  console.log('function-this:',this)  // button
},false)
button.addEventListener('click',() => {
  console.log('world')
  console.log('arrow-function-this:', this) // window
},false)


function handleInlineClick(){
  console.log(this)  // window (内联函数绑定)
}


// ------------------- 同一个EventTarget注册多个相同的 EventListener -------------------
//  只会输出一次
function same_listener() {
  console.log('我会重复输出吗?')
}
const _button = document.querySelector('._button')
_button.addEventListener('click', same_listener, false)
_button.addEventListener('click', same_listener, false)



//--------------------------- 循环绑定 --------------------------
const aLi = document.querySelectorAll('.player-list li')
for(var i = 0; i < aLi.length; i++){
  aLi[i].addEventListener('click', function(e){
    console.log('i', i, e.target) // 都是3
  },false)
}

function get_player(i,e){
  console.log(i,e.target) // 0 1 2
}
for(var i = 0; i < aLi.length; i++){
  aLi[i].addEventListener('click', get_player.bind(null,i),false)
}


// ------------------- 运行环境 --------------
_button.onclick = function() {
  console.log('this指向', this) // button
}
