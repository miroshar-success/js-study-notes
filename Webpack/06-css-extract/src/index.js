import './reset.css';

function createElement(tag) {
  let element = document.createElement(tag);
  element.textContent = 'hello world';
  return element;
}

document.body.appendChild(createElement('div'))
