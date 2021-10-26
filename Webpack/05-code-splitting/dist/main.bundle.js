/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
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
/*-----------------------------import().then()---------------------------------*/
// function createElement() {
//   const button = document.createElement('button');
//   button.textContent = 'hello world';
//   return button;
// }
// const button = createElement();

// button.addEventListener('click',function() {
//   import(/*webpackChunkName print*/'./print').then(({print}) => {
//     print('hello world')
//   })
// },false)
// document.body.appendChild(button);


// 多入口打包  index.js
// import createElement from './global.js'

// let button = createElement('button','click me')

// document.body.appendChild(button)

/*---------------------------------------- import().then() --------------------------------------------*/

const button = document.createElement('button');

button.textContent = 'click me';
button.classList.add('button')
document.body.appendChild(button)

// button.addEventListener('click',() => {
//   import(/* webpackChunkName: 'print' */'./print.js').then(({print}) => {
//     print('hello world')
//   })
// },false)


/******/ })()
;