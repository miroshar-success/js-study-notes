// ------------------- 单例模式 ---------------------
const Singleton = function(name) {
  this.name = name
}
Singleton.prototype.getName = function() {
  console.log(this.name)
}
Singleton.getInstance = (function() {
  let instance = null
  return function(name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()
const singleton_a = Singleton.getInstance('a')
const singleton_b = Singleton.getInstance('b')

console.log(singleton_a, singleton_b, singleton_a === singleton_b)

// ------------- 下一个例子 --------------------
/**
 * 用代理实现单例模式, 既可以让这个类变成普通的实例可产生多个实例, 也可以当做单例模式使用！
*/
const CreateDialog = function(content) {
  this.content = content
  this.init()
}
CreateDialog.prototype.init = function() {
  const element = document.createElement('div')
  element.textContent = this.content
  document.body.appendChild(element)
}
CreateDialog.getInstance = function(content) {
  return new CreateDialog(content)
}

// 代理实例 使之变成一个 单例
const ProxySingletonDialog = (function() {
  let instance
  return function(content) {
    if (!instance) {
      instance = CreateDialog.getInstance(content)
    }
    return instance
  }
})()

const dialog_1 = CreateDialog.getInstance('hello')
const dialog_2 = CreateDialog.getInstance('world')
console.log(dialog_1, dialog_2, dialog_1 === dialog_2)
// CreateDialog {content: 'hello'}   CreateDialog {content: 'world'}   false

const dialog_3 = ProxySingletonDialog('你好')
const dialog_4 = ProxySingletonDialog('世界')
console.log(dialog_3, dialog_4)
// CreateDialog {content: '你好'}     CreateDialog {content: '你好'}

// --------------------------------- 测试 ----------------------------------
const multiple_btn = document.querySelector('button.multiple-button')
const single_btn = document.querySelector('button.single-button')

const CreateLoginDialog = function(x, y) {
  this.x = x
  this.y = y
  this.init()
}
CreateLoginDialog.prototype.init = function() {
  const element = document.createElement('div')
  element.style.left = this.x + 'px'
  element.style.top = this.y + 'px'
  element.classList.add('dialog')
  document.body.appendChild(element)
}

multiple_btn.addEventListener('click', () => {
  const left = Number.parseInt(Math.random() * window.innerWidth - 300)
  const top = Number.parseInt(Math.random() * window.innerHeight - 400)
  new CreateLoginDialog(left, top)
})

const ProxySingletonLoginDialog = (function() {
  let instance = null
  return function(x, y) {
    if (instance) {
      return instance
    }
    return instance = new CreateLoginDialog(x, y)
  }
})()
single_btn.addEventListener('click', () => {
  const left = Number.parseInt(Math.random() * window.innerWidth - 300)
  const top = Number.parseInt(Math.random() * window.innerHeight - 400)
  ProxySingletonLoginDialog(left, top)
})


// -------------------- 根据单一职责原则 将实例的逻辑 和 创建单例 逻辑分离 ------------------------
const getSingle = function(fn) {
  let result = null
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}
const createIframe = (src) => {
  return function() {
    console.log('执行了吗')
    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    iframe.src = src
  }
}

const createImage = (src) => {
  return function() {
    const image = document.createElement('img')
    image.width = 200
    document.body.appendChild(image)
    image.src = src
  }
}

getSingle(createIframe('http://www.baidu.com'))()
getSingle(createImage('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F25ae6e4e-9795-488f-80d6-2e29ff3352c9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691806181&t=6a81b14aaf58d20edfd885fb8a1bcd01'))()

// ----------------------- 绑定一次事件 -----------------------------
const bindEvent = getSingle(function() {
  const list = document.querySelector('.list')
  list.addEventListener('click', () => {
    console.log('click')
  }, false)
  return true
})

// 这样写事件会绑定三次
/* const bindEvent = function() {
  const list = document.querySelector('.list')
  list.addEventListener('click', () => {
    console.log('click')
  }, false)
} */

const render = () => {
  console.log('开始渲染列表')
  bindEvent()
}
render()
render()
render()
// 开始渲染列表输出3次, 事件只绑定一次