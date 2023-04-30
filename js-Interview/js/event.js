const playerList = document.querySelector('.event-list')
playerList.addEventListener('click', (event) => {
  event.stopPropagation()
  console.log(event, event.target, event.currentTarget)
})

// --------- customEvent ------------
window._on = window.addEventListener
window._off = window.removeEventListener
window._emit = (type, detail) => window.dispatchEvent(new CustomEvent(type, {
  detail
}))

window._on('custom-event', (event) => {
  console.log(event.detail)
})
window._emit('custom-event', { message: 'hello world' })