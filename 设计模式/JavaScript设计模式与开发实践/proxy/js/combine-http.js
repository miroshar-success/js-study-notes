const checkBoxList = document.querySelectorAll('#form input')

const proxySynchronousFile = (function () {
  const cache = new Set()
  let timer = null
  return function(id) {
    cache.add(id)
    if (timer) return
    timer = window.setTimeout(function() {
      console.log(cache)
      clearTimeout(timer)
      timer = null
      cache.clear()
    }, 1800)
  }
})()

const bindEvent = () => {
  for (let i = 0; i < checkBoxList.length; i++) {
    const checkbox = checkBoxList[i]
    checkbox.addEventListener('click', function () {
      if (this.checked) {
        proxySynchronousFile(i)
      }
    }, false)
  }
}
bindEvent()