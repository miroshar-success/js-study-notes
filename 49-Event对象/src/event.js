function click1() {
  console.log('click-1', this)  // window
}
function click2(t) {
  console.log('click-2', t);
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


// ---------- 自定义事件 ----------
window.addEventListener('cat', function(e) {
  console.log(e.detail) //  {message: 'hello world'}
})
const custom_event = new CustomEvent('cat', {
  detail: {
    message: 'hello world'
  },
  bubbles: false
})
const custom_button = document.querySelector('.custom-button')
custom_button.addEventListener('click', function() {
  window.dispatchEvent(custom_event)
})


// ---------- 检测是否支持passiveSupported ------------
let passiveSupported = false
try {
  const options = Object.defineProperty({}, 'passive', {
    get() {
      passiveSupported = true
    }
  })
  window.addEventListener('test', null, options)
} catch(err) {}

console.log('passive support:', passiveSupported) // true


// -------------------- 发布订阅模式 ------------------
window._on = window.addEventListener
window._off = window.removeEventListener
window._once = (type, listener) => window.addEventListener(type, listener, {
  once: true
})
window._emit = (type, detail) => window.dispatchEvent(new CustomEvent(type, {
  detail
}))

const listen_custom_event = (event) => {
  console.log(event.detail)
}

window._on('custom-event', listen_custom_event)
window._emit('custom-event', { message: '你好生活'})  // {message: '你好生活'}

window._once('once-event', listen_custom_event)
window._emit('once-event', { message: 'hello, world'})  // {message: 'hello, world'}
window._emit('once-event', { message: 'hello, world'})  // 无输出

window._emit('custom-event', { message: '你好生活'})    // {message: '你好生活'}
window._off('custom-event', listen_custom_event)
window._emit('custom-event', { message: '你好生活'})  //  无输出


// ----------- 修改版本 -------------
class EventEmitter extends EventTarget {
  on(type, listener) {
    this.addEventListener(type, listener)
  }
  once(type, listener) {
    this.addEventListener(type, listener, {
      once: true
    })
  }
  off(type, listener) {
    this.removeEventListener(type, listener)
  }
  emit(type, data) {
    this.dispatchEvent(new CustomEvent(type, {
      detail: data
    }))
  }
}

const event_emitter = new EventEmitter()
const listen_event_emitter = (event) => {
  console.log('event-emitter:', event.detail)
}
event_emitter.on('dog', listen_event_emitter)
event_emitter.emit('dog', {
  name: 'hello'
})  // 正常触发
event_emitter.emit('dog', {
  name: 'world'
}) // 正常触发
event_emitter.off('dog', listen_event_emitter)
event_emitter.emit('dog', {
  name: 'hello world'
})  // 此时触发没有输出


event_emitter.once('cat', listen_event_emitter)
event_emitter.emit('cat', {
  name: '你好'
})
event_emitter.emit('cat', {
  name: '生活'
})
