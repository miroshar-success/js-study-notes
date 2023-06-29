// ----------------------- 外观模式 --------------------------
// 为一组复杂的子系统接口提供一个更高级的统一接口。
function addEvent(dom, type, listener) {
  if (dom.addEventListener) {
    dom.addEventListener(type, listener, false)
  } else if (dom.attachEvent) {
    dom.attachEvent(`on${type}`, listener)
  } else {
    dom[`on${type}`] = listener
  }
}

const getEvent = function(e) {
  return e || window.e
}
const preventDefault = function(e) {
  const event = getEvent(e)
  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
}
const getTarget = (e) => {
  const event = getEvent(e)
  return event.target || event.srcElement
}

const btn = document.querySelector('.btn')
const listener = function(event) {
  console.log('hello', event)
}
addEvent(btn, 'click', listener)
addEvent(btn, 'click', (e) => {
  preventDefault(e)
  console.log(getTarget(e))
  console.log('我是绑定的第二个事件')
})
// 通过外观模式, 对接口的二次封装隐藏其复杂性。