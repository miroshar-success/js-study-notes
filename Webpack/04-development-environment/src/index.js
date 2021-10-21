import print from './print.js'

function createElement(tag){
  const button = document.createElement(tag)
  button.textContent = 'click me!';
  return button;
}

const button = createElement('button')

document.body.appendChild(button)

button.addEventListener('click',function() {
  print('hello world')
})
