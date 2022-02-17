const baidu_btn = document.querySelector('.baidu_btn')

baidu_btn.addEventListener('click', function() {
  const state = { 'title': '百度'}
  window.history.pushState(state,'', 'baidu.com')
},false)


// 锚点相同的时候只会创建一条历史记录。
const baidu_qq = document.querySelector('.baidu_qq')
baidu_qq.addEventListener('click', function() {
  window.location = '#foo'
})


const ali_btn = document.querySelector('.ali_btn')
ali_btn.addEventListener('click', function() {
  const state = {title: '阿里'}
  window.history.replaceState(state, '', 'ali.com')
}, false)


// --------- back forward go ------
function _$(selector) {
  return document.querySelector(selector)
}

_$('.go_btn').addEventListener('click', () => {
  const value = _$('.input_number').value;
  window.history.go(value)
}, false)

_$(".forward_btn").addEventListener('click', () => {
  window.history.forward()
},false)

_$('.back_btn').addEventListener('click', () => {
  window.history.back()
})


window.addEventListener('popstate', () => {
  console.log('popstate', event.state)
})


// ----------- history router ---------

function changeBodyColor(color) {
  const body = document.querySelector('body')
  body.style.backgroundColor = color;
}
class HistoryRouter {
  constructor() {
    this.routes = {}
    this.listen_popstate()
  }
  go(path) {  // 路由跳转
    // pushState 无法监听popstate
    window.history.pushState({path}, null, path)
    const cb = this.routes[path]
    if(cb) {
      cb()
    }
  }
  route(path, callback) { // 注册路由
    this.routes[path] = callback || function() {}
  }
  listen_popstate() { // 在点击按钮切换时修改
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]()
    })
  }
}

const history_router = new HistoryRouter()
history_router.route('/gray', () => {
  changeBodyColor('gray')
})
history_router.route('/green', () => {
  changeBodyColor('green')
})
history_router.route('/blue', () => {
  changeBodyColor('blue')
})

const history_link = document.querySelector('.history-link')
history_link.addEventListener('click', e => {
  const tagName = e.target.tagName;
  if(tagName.toLowerCase() === 'a') {
    e.preventDefault()
    const path = e.target.getAttribute('href')
    history_router.go(path)
  }
},false)
