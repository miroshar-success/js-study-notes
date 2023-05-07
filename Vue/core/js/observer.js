const player = {
  name: 'kyrie irving',
  age: 32,
  fullName: {
    firstName: 'kyrie',
    lastName: 'irving'
  },
  skill: []
}

const defineReactive = (target, key, value) => {
  // 深度监听
  observer(value)
  Object.defineProperty(target, key, {
    get () {
      return value
    },
    set (v) {
      if (v !== value) {
        // 如果给对象再次赋值为一个对象
        observer(v)
        value = v
        console.log('数据更新')
      }
    }
  })
}

// 监听数组属性更新
const arrayPrototype = Object.call(Array.prototype);
['pop', 'push', 'shift', 'unshift', 'splice'].forEach(arrayMethod => {
  arrayPrototype[arrayMethod] = function() {
    const args = [...arguments]
    Array.prototype[arrayMethod].call(this, ...args)
    console.log('视图更新')
    for (const item of args) {
      observer(item)
    }
  }
})

function observer (data) {
  if (typeof data !== 'object' || data === null) return data
  if (Array.isArray(data)) {
    data.__proto__ = arrayPrototype
  }
  for (const key in data) {
    if (!Object.hasOwnProperty.call(data, key)) continue;
    defineReactive(data, key, data[key])
    // 先取出value, 然后get函数里 不能使用data[key] 返回, 否则会造成爆栈
/*     let value = data[key]
    Object.defineProperty(data, key, {
      get () {
        return value
      },
      set (v) {
        console.log(v)
        value = v
      }
    }) */
  }
}
observer(player)

player.age = 30
// player.fullName.firstName = 'Kyrie'
// player.fullName.lastName = 'Irving'

/* player.skill.push('hello')
player.skill.pop() */
player.skill.push('hello')

player.skill.push({
  message: 'hello world'
})

player.skill[1]['message'] = '1234'
player.skill[1]['message'] = '45432'

const obj = {
  msg: 'hello world',
  message: '你好 生活'
}
with(obj) {
  console.log(msg, message)
}