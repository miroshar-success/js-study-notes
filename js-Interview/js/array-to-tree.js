// ------------- 将数组转化为一个树 -------------
const array = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 2 },
  { id: 7, name: '部门G', parentId: 3 },
]
/**
 * [
 *  { id, parentId, children }
 * ]
 * 
*/
const array_to_tree = (list = []) => {
  const map = new Map()
  let root
  list.forEach(item => {
    map.set(item.id, item)
    const parentNode = map.get(item.parentId)
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = []
      }
      parentNode.children.push(item)
    }
    if (item.parentId === 0) {
      root = item
    }
  })
  return root
}
const tree = array_to_tree(array)
console.log(JSON.stringify(tree, null, 3))


const categoryList = [
  { id: 0, name: '衣服', categoryId: 1, parentCategoryId: 0 },
  { id: 1, name: '美食', categoryId: 2, parentCategoryId: 0 },
  { id: 2, name: '电子产品', categoryId: 3, parentCategoryId: 0 },
  { id: 3, name: '短袖', categoryId: 4, parentCategoryId: 1 },
  { id: 4, name: '短裤', categoryId: 5, parentCategoryId: 1 },
  { id: 5, name: '裙子', categoryId: 6, parentCategoryId: 1 },
  { id: 6, name: '手机', categoryId: 7, parentCategoryId: 3 },
  { id: 7, name: '耳机', categoryId: 8, parentCategoryId: 3 },
  { id: 8, name: '电脑', categoryId: 9, parentCategoryId: 3 },
  { id: 9, name: '电子手表', categoryId: 10, parentCategoryId: 3 },
  { id: 10, name: '烤鸭', categoryId: 11, parentCategoryId: 2 },
  { id: 11, name: '苹果', categoryId: 12, parentCategoryId: 7 },
  { id: 12, name: '小米', categoryId: 13, parentCategoryId: 7 },
  { id: 13, name: '华为', categoryId: 14, parentCategoryId: 7 },
  { id: 14, name: '北京全聚德烤鸭', categoryId: 15, parentCategoryId: 11 },
  { id: 15, name: '安庆烤鸭', categoryId: 16, parentCategoryId: 11 }
]

const convert = (list = []) => {
  const map = {}
  list.forEach(item => {
    map[item.categoryId] = item
  })
  list.forEach(item => {
    if(map[item.parentCategoryId]) {
      const parentCategory = map[item.parentCategoryId]
      if (!parentCategory.children) {
        parentCategory.children = []
      }
      parentCategory.children.push(item)
    }
  })
  return Object.values(map).filter(item => item.parentCategoryId == 0)
}
console.log('----------')
console.log(JSON.stringify(convert(categoryList), null, 2))


const root = {"id":1,"name":"部门A","parentId":0,"children":[{"id":2,"name":"部门B","parentId":1,"children":[{"id":4,"name":"部门D","parentId":2},{"id":5,"name":"部门E","parentId":2},{"id":6,"name":"部门F","parentId":2}]},{"id":3,"name":"部门C","parentId":1,"children":[{"id":7,"name":"部门G","parentId":3}]}]}

const tree_to_array = (root) => {
  const temp = []
  const list = [root]
  while (list.length > 0) {
    const node = list.pop()
    if (!node) break
    const { id, name, parentId, children = [] } = node
    temp.push({ id, name, parentId })
    if (children.length) {
      list.push(...children)
    }
  }
  return temp
}
console.log('temp:', tree_to_array(root))