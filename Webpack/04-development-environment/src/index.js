// import print from './print.js'

// function createElement(tag){
//   const button = document.createElement(tag)
//   button.textContent = 'click me!';
//   return button;
// }

// const button = createElement('button')

// document.body.appendChild(button)

// button.addEventListener('click',function() {
//   print('hello world')
// })


// hot-module-replacement
/*
1. css模块开箱即用热更新
*/
import './style.css';

console.log('hello world')

function createElement(){
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  return textarea;
}
console.log('hello world')
document.body.appendChild(createElement());

// --------------- js文件模块热替换 该对象是hmr对象提供的
// if(module.hot){
//   module.hot.accept('./index.js',() => {
//     console.log('我更新了')
//   })
// }

