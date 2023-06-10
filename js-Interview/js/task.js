/* const create_element = (tag, text) => {
  const div = document.createElement(tag)
  div.textContent = text
  return div
}
const tag_container = document.querySelector('#task-container')

for (let i = 0; i < 3; i++) {
  const tag = create_element('div', 'Hello World')
  tag_container.append(tag)
}
// 微任务在DOM渲染之前
Promise.resolve().then(() => {
  alert('DOM渲染了吗?')
})
// 宏任务在DOM渲染之后
setTimeout(() => {
  alert('setTimeout里DOM渲染了吗?')
}, 0) */

// ----------------- 宏任务 / 微任务 / DOM --------------
const players = ['kyrie', 'durant', 'james']
const oPlayerList = document.querySelector('.player-list')
for (const player of players) {
  const li = document.createElement('li')
  li.textContent = player
  oPlayerList.appendChild(li)
}
console.log('count---1: ', oPlayerList.childElementCount) // 3

console.log('同步任务开始')
Promise.resolve().then(() => {
  console.log('微任务', oPlayerList.childElementCount) // 3
})
window.setTimeout(() => {
  // 此时未渲染到页面
  console.log('宏任务', oPlayerList.childElementCount)  // 3
}, 10)
console.log('同步任务结束')