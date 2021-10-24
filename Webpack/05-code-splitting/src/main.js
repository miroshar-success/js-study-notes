// import Vue from 'vue'
// const root = document.createElement('div')

// const Counter = {
//   data() {
//     return {
//       counter:0
//     }
//   }
// }
// const instance = Vue.createApp(Counter);
// const vm = instance.mount(root)
// console.log('hello world')

// console.log(instance, vm);


import createElement from './global.js'

let link = createElement('a','hello world');
document.body.appendChild(link);
