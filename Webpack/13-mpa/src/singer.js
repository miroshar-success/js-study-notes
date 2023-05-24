import { sum, multiple } from './sum.js';

const singers = ['周杰伦', '王力宏', '陶喆', '林俊杰']

const button = document.createElement('button')

button.addEventListener('click', () => {
  singers.forEach(singer => {
    console.log('singer:', singer)
  })
  console.log('sum:', sum(3, 6))
  console.log('multiple:', multiple(3, 6))
}, false)
button.textContent = 'get singer'

document.body.appendChild(button)