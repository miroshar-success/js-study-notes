const outer_container = document.querySelector('.outer-container')
const inner_container = document.querySelector('.inner-container')

const click_observer = new MutationObserver(function(mutationsList) {
  console.log('observer')
})
function click_function(event) {
  console.log('click invoked')
  click_observer.observe(event.target, {
    attributes: true
  })
  Promise.resolve().then(() => {
    console.log('promise')
  })
  event.target.setAttribute('data-id', Math.random().toString().substring(0, 5))
  setTimeout(() => {
    console.log('setTimeout')
  }, 0)
}

inner_container.addEventListener('click', click_function, false)
outer_container.addEventListener('click', click_function, false)


inner_container.click()


console.log('cookie-enabled', window.navigator.cookieEnabled)
