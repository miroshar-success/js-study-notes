// ------------- Node.insertBefore() -------------
//在参考节点之前插入一个拥有指定父节点的子节点。
// const insertedNode = parentNode.insertBefore(newNode,referenceNode)
const parent = document.querySelector('#insert-before')
const kyrie = document.querySelector('.kyrie')
const button = document.querySelector('.add-button')

button.addEventListener('click', () => {
  const newNode = document.createElement('div')
  newNode.textContent = 'new node';
  // parent.insertBefore(newNode, kyrie)
  parent.insertBefore(newNode,null) // 添加到列表末尾
},false)


// --------------- 子节点是DocumentFragment---------------------
button.addEventListener('click', () => {
  const DocumentFragment = document.createDocumentFragment()
  for(let i = 0; i < 10; i++) {
    let div = document.createElement('div')
    div.textContent = i;
    DocumentFragment.appendChild(div)
  }
  parent.insertBefore(DocumentFragment,null)
})
