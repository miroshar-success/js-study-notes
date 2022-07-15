function visit_node(node) {
  const type = node.nodeType
  switch(type) {
    case node.ELEMENT_NODE:
      console.log('--------element-------',node.nodeName)
      break;
    case node.TEXT_NODE:
      console.log('--------text----------', node.textContent)
      break;
    case node.COMMENT_NODE:
      console.log('-------comment -------', node.textContent)
      break;
  }
}

// 广度优先遍历
function node_for(node) {
  const root = []
  root.push(node)
  while(root.length) {
    const element = root.shift()
    visit_node(element)
    const children = element.childNodes;
    if(children && children.length) {
      children.forEach(c => {
        root.push(c)
      })
    }
  }
}
const root_map = document.querySelector('#map_node')
node_for(root_map)

// --------- 深度优先遍历 ----------
function map_node(node) {
  const arr = [node]
  while(arr.length) {
    const element = arr.pop()
    if(element == null) break;
    visit_node(element)
    const children = element.childrenNodes;
    if(children && children.length) {
      Array.from(children).reverse().forEach(c => {
        arr.push(c)
      })
    }
  }
}

// nodeType
Array.from(root_map.children).forEach(item => {
  console.log(item.nodeType)
})

function inherit_node (node) {
  const result = []
  let proto = node
  while(proto.__proto__) {
    const name = proto.__proto__.constructor.name
    result.push(name)
    proto = proto.__proto__
  }
  return result
}

console.log(inherit_node(document.createElement('div')))
// ['HTMLDivElement', 'HTMLElement', 'Element', 'Node', 'EventTarget', 'Object']
console.log(inherit_node(document.createTextNode('hello')))
// ['Text', 'CharacterData', 'Node', 'EventTarget', 'Object']
console.log(inherit_node(document))
// ['HTMLDocument', 'Document', 'Node', 'EventTarget', 'Object']

