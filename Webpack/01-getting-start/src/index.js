import {firstName, lastName} from './main.js';

function createElement() {
  let element = document.createElement('div')
  element.textContent = 'hello world';
  element.className = 'hello'
  return element;
}

document.body.appendChild(createElement());

document.querySelector('.hello').addEventListener('click',function(){
  window.alert(`${firstName}-${lastName}`);
},false)


