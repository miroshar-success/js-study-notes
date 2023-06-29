// ----------------- 装饰者模式 (Decorator) --------------------
const decorator_btn = document.querySelector('.decorator-btn')
decorator_btn.addEventListener('click', () => {
  console.log('我是第一次绑定的事件')
}, false)

const decorator = function(dom, fn) {
  dom.addEventListener('click', fn, false)
  if (dom.onclick === 'function') {
    const old_fn = dom.onclick
    dom.onclick = fn
    old_fn()
  }
}
// ------------- 通过 DOM 0 级事件绑定 ---------------
decorator_btn.onclick = function() {
  console.log('我是DOM 0级事件')
}
decorator(decorator_btn, () => {
  console.log('我是被装饰器添加的')
})

// ----------- 对input 添加 blur 和 focus 事件 ------------------
const blur_decorator = function(dom, fn) {
  dom.addEventListener('blur', fn, false)
}
const focus_decorator = function(dom, fn) {
  dom.addEventListener('focus', fn, false)
}
const decorator_input = document.querySelector('.decorator-input')

decorator(decorator_input, () => {
  console.log('我被点击了')
})
blur_decorator(decorator_input, () => {
  console.log('失去焦点')
})
focus_decorator(decorator_input, () => {
  console.log('获取焦点')
})
