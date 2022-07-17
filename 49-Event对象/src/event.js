var click1 = () => {
  console.log('click-1')
}

var click2 = (...args) => {
  console.log(args)
}

// -------- 注册同一个函数 ----------
function listen_click() {
  console.log('click')
}
const click_button = document.querySelector('.click_button')
console.log(click_button)
// click_button.addEventListener('click', listen_click, true)
// click_button.addEventListener('click', listen_click, true)

click_button.addEventListener('click', function() {
  console.log('click')
}, false)
click_button.addEventListener('click', function() {
  console.log('click')
}, false)

document.querySelector('.link').addEventListener('click', function(event) {
  event.preventDefault()
})


// --------- immediate button -------------
const immediate_button = document.querySelector('.immediate_button')
immediate_button.addEventListener('click', function() {
  console.log('hello 1')
})
immediate_button.addEventListener('click', function(event) {
  console.log('hello 2')
  // event.stopImmediatePropagation()
  event.stopPropagation()
})
immediate_button.addEventListener('click', function() {
  console.log('hello 3')
})
immediate_button.addEventListener('click', function() {
  console.log('hello 4')
})

// --------- 生成uuid ----------
const array = []
for (let i = 0; i < 20; i++) {
  const uuid = window.URL.createObjectURL(new Blob([''])).split('/').pop()
  array.push(uuid)
}
console.log(array)
