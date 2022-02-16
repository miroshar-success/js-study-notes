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
