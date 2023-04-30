const create_element = (tag, text) => {
  const div = document.createElement(tag)
  div.textContent = text
  return div
}
const tag_container = document.querySelector('#task-container')

for (let i = 0; i < 3; i++) {
  const tag = create_element('div', 'Hello World')
  tag_container.append(tag)
}
Promise.resolve().then(() => {
  alert('DOM渲染了吗?')
})
setTimeout(() => {
  alert('setTimeout里DOM渲染了吗?')
}, 0)