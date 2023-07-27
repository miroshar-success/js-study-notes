// ------------------- 发布订阅模式 -----------------------
(function() {
  const saleOffices = {
    clientList: [],
    listen: function(fn) {
      this.clientList.push(fn)
    },
    trigger: function() {
      for (let i = 0, length = this.clientList.length; i < length; i++) {
        const fn = this.clientList[i]
        fn.apply(this, arguments)
      }
    }
  }
  saleOffices.listen(function(price, squareMeter) {
    console.log('价格=', price)
    console.log('面积=', squareMeter)
  })
  saleOffices.listen(function(price, floor) {
    console.log('价格=', price)
    console.log('楼层=', floor)
  })

  saleOffices.trigger('180W', '89.97平方米')
  saleOffices.trigger('200W', '18层')
})();
// ------------ 以上数据没有key ——----------------


// ----------------- 改进版本 -------------------
(function () {
  const saleOffices = {
    clientList: {},
    listen: function(key, fn) {
      if (!this.clientList.hasOwnProperty(key)) {
        this.clientList[key] = []
      }
      this.clientList[key].push(fn)
    },
    trigger(...args) {
      const key = args.shift()  // 取第一个参数
      const fns = this.clientList[key] || []
      for (const fn of fns) {
        fn.apply(this, args)
      }
    }
  }
  saleOffices.listen('小王', function(price, squareMeter) {
    console.log('价格=', price)
    console.log('面积=', squareMeter)
  })
  saleOffices.listen('小明', function(price, floor) {
    console.log('价格=', price)
    console.log('楼层=', floor)
  })
  console.log('--------------------------------')
  // console.log(saleOffices)
  saleOffices.trigger('小明', '200W', '23层')
  saleOffices.trigger('小李') // 没有注册事件
  saleOffices.trigger('小王', '10000W', '140平')
})();


// ------------------------ 通用的发布订阅模式 -----------------------------
class Event {
  constructor() {
    this.events = {}
  }
  listen(key, callback) {
    if (!this.events.hasOwnProperty(key)) {
      this.events[key] = []
    }
    if (typeof callback === 'function') {
      this.events[key].push(callback)
    }
  }
  trigger(key, ...args) {
    if (!this.events[key]) return
    const cbs = this.events[key] || []
    for (const cb of cbs) {
      cb(...args)
    }
  }
  clear (key, callback) {
    if (key === undefined) {
      this.events = {}
    } else {
      const cbs = this.events[key] || []
      const idx = cbs.findIndex(cb => cb === callback)
      if (idx >= 0) {
        cbs.splice(idx, 1)
      }
      this.events[key] = cbs
    }
  }
}
const bus = new Event()
const fn = () => {
  console.log('更新')
}
bus.listen('update', fn)
bus.trigger('update')
bus.clear('update', fn)
bus.trigger('update')

// ------------------- 点击按钮 将点击次数 显示在 div -----------------
const btn = document.querySelector('.button')
const box = document.querySelector('.box')
bus.listen('click', listen_click)
btn.addEventListener('click', () => {
  let count = Number(box.textContent || 0)
  bus.trigger('click', count+=1)
}, false)

function listen_click (count) {
  box.textContent = count
}
