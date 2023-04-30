const drag_box = document.querySelector('.drag-box')
let drag_timer = null
/* drag_box.addEventListener('drag', (event) => {
  if (drag_timer) return
  drag_timer = window.setTimeout(() => {
    console.log(event.clientX, event.clientY)
    drag_timer = null
  }, 100)
}, false); */

const throttle = (fn, delay = 200) => {
  let timer = null
  return function () {
    const args = [...arguments]
    const _this = this
    if (timer) return
    timer = window.setTimeout(() => {
      fn.apply(_this, args)
      timer = null
    }, delay)
  }
}
drag_box.addEventListener('drag', throttle((e) => {
  console.log(e.clientX, e.clientY)
}, 100))