// ------------------------ 查看生成contenthash -----------------------------
import _ from 'lodash';
import {print} from './print.js'
import './style.css'
function createElement(tag, text) {
  const element = document.createElement(tag)
  element.textContent = text;
  return element;
}
const string = _.camelCase('Foo Bar')

const button = createElement('button','click me')
button.addEventListener('click',function(){
  print('hello world111')
  console.log('hello world11112222')
},false)

document.body.appendChild(button)
document.body.appendChild(createElement('div',string))


//-------------------------------------- runtimeChunk测试 ------------------------------------------
// import Vue from 'vue'
// import router from './router/index.js'
// import App from './App.vue'
// const root = document.createElement('div')
// document.body.appendChild(root)

// new Vue({
//   render:h => h(App),
//   router
// }).$mount(root)


