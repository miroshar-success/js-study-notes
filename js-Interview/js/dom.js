const node_container = document.querySelector('#node-container')
console.log(node_container.childNodes)

console.log(node_container.firstChild, node_container.lastChild)

console.log(node_container.firstChild.parentNode)

console.log(node_container.nodeValue)
console.log(node_container.firstChild.nodeValue)

const create_node_list = () => {
  const fragment = document.createDocumentFragment()
  for (let i = 0; i < 10; i++) {
    const div = document.createElement('div')
    div.textContent = i
    div.className = `node-${i}`
    fragment.appendChild(div)
  }
  node_container.append(fragment)
}
create_node_list()

console.log('parentNode:', document.querySelector('.node-1').parentNode)
console.log('parentElement:', document.querySelector('.node-1').parentElement)

node_container.classList.add('hello')
node_container.classList.add('world')
console.log(node_container.classList)

node_container.classList.toggle('text')
node_container.classList.toggle('text')
console.log(node_container.classList, node_container.className)

console.log('clientLeft', node_container.clientLeft)
console.log('clientTop', node_container.clientTop)