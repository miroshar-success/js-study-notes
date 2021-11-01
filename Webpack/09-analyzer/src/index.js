/* function createElement(){
  const element = document.createElement('div')
  element.classList.add('text')
  element.textContent = 'hello world';
  return element;
}

document.body.appendChild(createElement()) */

// ---------------------------------- 引入一个文件后 查看打包结果 ----------------------------------
/* import {print} from './print.js'

function createButton(){
  const button = document.createElement('button')
  button.textContent = 'click me';
  return button;
}
const button = createButton()
document.body.appendChild(button);

button.addEventListener('click', function(event) {
  print('hello world');
},false)
 */


 // -------------------------------- commonjs打包结果   --------------------------------
/* // const {name} = require('./name.js')
import say, {print,hi,hello} from './print'
const button = document.createElement('button');
button.textContent = 'click me'
button.addEventListener('click',function() {
  const name = 'my name is kyrie';
  print(name)
  hi(name)
  hello(name)
  say(name)
},false)
document.body.appendChild(button)
console.log('index.js代码执行了') */


// --------------------------------  懒加载 --------------------------------
const button = document.createElement('button')
button.addEventListener('click',function(){
  import(/*webpackChunkName: "print"*/ './print.js').then((module) => {
    console.log('module:', module)
    // print('hello world')
    module.print('hello')
  })
},false)
button.textContent = 'click me';
document.body.appendChild(button)
