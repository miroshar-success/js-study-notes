// ------------ 代理模式 ----------
class LoadImage {
  constructor(name) {
    this.name = name;
  }
  display() {
    console.log(`${this.name} display...`)
  }
}

class ProxyImage {
  constructor(filename) {
    this.image = new LoadImage(filename)
  }
  display() {
    this.image.display()
  }
}

const proxy_image = new ProxyImage('hello world!')
proxy_image.display()




// ------- demo ---------
const star = {
  name: 'jay',
  phone: '131xxxx8900',
  age: 37
}

const agent = new Proxy(star, {
  get(target, key, receiver) {
    if(key === 'phone') {
      return '1520989xxxx'
    }
    if(key === 'price') {
      return 1200001
    }
    if(Object.keys(target).includes(key)) {
      return target[key]
    } else {
      throw new Error('访问的属性不存在')
    }
  },
  set(target, key, value) {
    if(key === 'price') {
      if(value < 120000) {
        throw new Error('价格太低')
      }else{
        target[key] = value
        return true
      }
    }else {
      if(Object.keys(target).includes(key)) {
        target[key] = value
        return true
      } else {
        return false;
      }
    }
  }
})
console.log(agent.phone, agent.price)
// agent.price = 100  报错
console.log(agent.hello)  // 报错, 访问的属性不存在

