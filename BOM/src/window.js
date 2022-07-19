console.log('------------------- window ---------------')
console.log(window.screenX, window.screenY)
console.log(window.innerWidth, window.innerHeight)
console.log(window.outerWidth, window.outerHeight)

window.addEventListener('focus', () => {
  console.log('focus, I am seen now')
}, false)

window.addEventListener('blur', () => {
  console.log('blur, I am hidden')
})

const open_button = document.querySelector('.open-button')
open_button.addEventListener('click', function() {
  window.open('http://www.baidu.com', 'baidu')
}, false)


// -------- visibilitychange ----------
document.addEventListener('visibilitychange', function(event) {
  console.log(document.visibilityState) // hidden / visible
}, false)


// ------ 是否在线 --------
window.ononline = function() {
  console.log('online')
}
window.onoffline = function() {
  console.log('offline')
}
