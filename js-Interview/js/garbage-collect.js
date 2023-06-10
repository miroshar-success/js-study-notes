const array = []
for (let i = 0; i < 10 * 1000; i++) {
  array.push(i)
}

const bind = () => {
  const data = {
    list: JSON.stringify(array)
  }
  // 闭包 内存不会销毁
  window.addEventListener('resize', () => {
    console.log(data)
  }, false)
}

let n = 0
const start = () => {
  n += 1
  window.setTimeout(() => {
    bind()
    if (n > 30) {
      window.alert('done')
    } else {
      start()
    }
  }, 200)
}

const garbage_collect_btn = document.querySelector('.garbage-collect-btn')

garbage_collect_btn.addEventListener('click', start, false)

// Performance / Memory 面板查看垃圾回收

const weak_set = new WeakSet()
const baz = () => {
  const player = {name: 'kyrie'}
  weak_set.add(player)
}
baz()

console.log(weak_set)

// weakMap 和 weakSet 中引用的对象都是弱引用，垃圾回收机制不考虑其他对象对它们的引用。
// weakMap 的弱引用只是键名 而不是键值。

let btn1 = document.querySelector('.weakmap-container .btn-1')
let btn2 = document.querySelector('.weakmap-container .btn-2')

const weak_map = new WeakMap()
weak_map.set(btn1, handle1)
weak_map.set(btn2, handle2)

function handle1() {
  console.log('handle-1')
}
function handle2() {
  console.log('handle-2')
}

btn1.addEventListener('click', weak_map.get(btn1), false)
btn2.addEventListener('click', weak_map.get(btn2), false)