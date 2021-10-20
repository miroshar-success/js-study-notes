import {print} from './print.js'

function createElement(tag){
  let element = document.createElement(tag)
  element.textContent = 'click me';
  return element;
}
let button = createElement('button');
document.body.appendChild(button);

button.addEventListener('click',function(){
  print('hello world')
},false)
