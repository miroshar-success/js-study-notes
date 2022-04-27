// ---------- node ----------
const container = document.getElementById('node-container')
console.log(container.childNodes)
for(const node of container.childNodes) {
  console.log('type:', node.nodeType) // 3 1 3
}


// -------- 深度优先遍历 DOM ---------
function visitNode(n) {
  switch(n.nodeType) {
    case n.ELEMENT_NODE:
      console.info('------- element -------', n.nodeName)
      break;
    case n.TEXT_NODE:
      if(n.textContent.trim()){
        console.info('------- text -------', n.textContent)
      }
      break;
    case n.COMMENT_NODE:
      console.info('------- comment------', n.textContent)
      break;
  }
}

function traverse(root) { // 深度遍历
  visitNode(root)
  const childNodes = root.childNodes
  if(childNodes.length) {
    childNodes.forEach(node => {
      traverse(node)
    })
  }
}
traverse(container)

console.log('-------------------------------')

// ---------- 广度优先遍历 ---------
function traverse2(root) {
  // ----- 先将 root 添加进 一个数组, 然后 将数组里的根节点 拿出来遍历子节点
  const array = []
  array.push(root)
  while(array.length > 0) {
    const node = array.shift()
    visitNode(node)
    if(node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(node => {
        array.push(node)
      })
    }
  }
}
traverse2(container)


// ---------- 将深度优先遍历 通过 while循环 改写 ----------
/*
将dom树的子节点
*/
console.log('-------------------------------')
function traverse3(root) {
  const array = [root]
  while(array.length > 0) {
    const node = array.pop()
    if(node == null) break;
    visitNode(node)
    const childNodes = node.childNodes
    if(childNodes && childNodes.length) {
      Array.from(childNodes).reverse().forEach(n => {
        array.push(n)
      })
    }
  }
}
traverse3(container)

