// -------------- MutationObserver --------------
const targetNode = document.querySelector('.mutation-container')
const observer_button = document.querySelector('.mutation-observer-button')

const observer = new MutationObserver(function(mutationList, observer) {
  setTimeout(() => {
    console.log('我执行了')
  }, 0)
  for(const mutation of mutationList) {
    console.log('mutation:', mutation)
    /*
    {
      attributeName: 'style',
      type: 'attributes',
      oldValue: ''
    }
    */
  }
})
observer.observe(targetNode, {
  attributes: true,
  childList: true,
  subtree: true
})

observer_button.addEventListener('click', () => {
  targetNode.style.color = 'red'
  targetNode.setAttribute('data-id', Math.random().toString().substring(0, 6))
  const element = document.createElement('img')
  targetNode.appendChild(element) /*
    {
      attributeName: null,
      type: 'childList'
    }
  */
}, false)


console.log('------------------- queueMicrotask --------------')
console.log('start', Date.now())

setTimeout(() => {
  console.log('setTimeout')
}, 0)
window.queueMicrotask(() => {
  console.log('queueMicrotask')
})
Promise.resolve().then(() => {
  console.log('promise')
})
console.log('end', Date.now())
/*
start 1658498438592
end 1658498438592
queueMicrotask
promise
*/
