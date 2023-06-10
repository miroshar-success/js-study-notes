const btn = document.querySelector('.animation-btn')
const box = document.querySelector('.animation-box')

btn.addEventListener('click', () => {
  let left = 0;
  const fn = () => {
    left += 10
    if (left < 300) {
      box.style.transform = `translate3d(${left}px, 0, 0)`;
      window.requestAnimationFrame(fn)
    }
  }
  fn()
}, false)


window.requestIdleCallback(() => {
  console.log('requestIdleCallback')
})
// setTimeout / requestAnimationFrame 谁先进入队列谁先执行, requestIdleCallback 最后执行
window.requestAnimationFrame(() => {
  console.log('requestAnimationFrame')
})
window.setTimeout(() => {
  console.log('timeout')
})

