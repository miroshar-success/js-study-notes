import './style.css';
console.log('hello')
const element = document.createElement('div')
element.classList.add('box')

document.body.appendChild(element)

const sum = (a, b) => a + b;
const multiple = (a, b) => a * b

console.log(sum(1,3))

console.log(multiple(3, 5))
console.log(multiple(3, 7))