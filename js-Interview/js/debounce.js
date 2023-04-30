const oInput = document.querySelector('.input')
/* let timer = null
oInput.addEventListener('keyup', (event) => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = window.setTimeout(() => {
    console.log(oInput.value)
    timer = null
  }, 300)
}, false) */


const debounce = (fn, delay = 200) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    const args = [...arguments]
    console.log('args', args)
    timer = window.setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
oInput.addEventListener('keyup', debounce(() => {
  console.log('hello world')
}), false)

oInput.addEventListener('keyup', () => {
  console.log('this:', this)
}, false)