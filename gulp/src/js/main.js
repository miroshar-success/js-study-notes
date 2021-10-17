function _$(el) {
  return document.querySelector(el)
}

_$('.button').addEventListener('click', () => {
  console.log('hello world')
},false)
