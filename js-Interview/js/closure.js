// ----------------------------------
/* function create () {
  const a = 100
  return function() {
    console.log(a)
  }
}

const fn = create()
const a = 200
fn()  */ // 100

// ----------------------------------
const closure = () => {
  let a = 100
  return () => {
    console.log('a', a)
    a+=1
    console.log(a)
  }
}
const c1 = closure()
c1()  // 101
c1()  // 102
c1()  // 103

// -------------------------------------
function print(fn) {
  const a = 200
  fn()
}
const a = 100
function fn() {
  // 函数定义的地方查找
  console.log(a)  // 100
}

print(fn)

console.log('--------------------- 闭包隐藏数据 -----------------------')
const create_cache = () => {
  const data = Object.create(null)
  return {
    set: (key, val) => {
      data[key] = val
    },
    get: (key) => {
      return data[key]
    }
  }
}

const cache_fn = create_cache()
cache_fn.set('firstName', 'kyrie')
cache_fn.set('lastName', 'irving')
console.log(cache_fn.get('age'))
console.log(cache_fn.get('firstName'))
console.log(cache_fn.get('lastName'))

console.log('------------------------事件循环绑定 -------------------')
for(let i = 0; i < 10; i++) {
  const link = document.createElement('div')
  link.addEventListener('click', () => {
    console.log(i)
  })
  link.textContent = `link - ${i}`;
  document.body.appendChild(link)
}
