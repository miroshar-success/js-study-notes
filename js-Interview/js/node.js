// NodeList
console.log(document.querySelectorAll('.list li'))
// HTMLCollection
console.log(document.getElementsByTagName('li'))

// HTMLCollection 子元素
console.log(document.querySelector('.list').children)

// NodeList
console.log(document.querySelector('.list').childNodes)


/**
 * class Node {}
 * 
 * class Document extends Node {}
 * class DocumentFragment extends Node {}
 * 
 * class Comment extends Node {}
 * class Text extends Node {}
 * 
 * class HTMLDivElement extends Node {}
 * class HTMLInputElement extends Node {}
 * // ...
*/

const nodeList = document.querySelector('#node-list')
const childNodes = nodeList.childNodes
const text = document.querySelectorAll('.text')

document.querySelector('.create-node-btn').addEventListener('click', function() {
  const span = document.createElement('span')
  span.textContent = 'a'
  span.classList.add('text')
  nodeList.appendChild(span)

  console.log(text.length)  // 一直都是2
  console.log(childNodes.length, childNodes)
  // 随着插入元素的增加而增加
}, false)