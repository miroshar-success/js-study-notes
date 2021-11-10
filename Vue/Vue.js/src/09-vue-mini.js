/*
1. 将data中的属性转化为setter / getter
2. 将传入的属性 挂载到vue实例上,
3. 将传入的data数据 挂载到$data上,
4. 将$data中的属性 通过Object.defineProperty 变为响应式
*/

class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    if(!(typeof data === 'object' && data !== null)) return;
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {  // 将属性转为getter/setter
    const _self = this;
    this.walk(value)  // 将值为object的 下面的 属性值也转换为getter/setter
    Object.defineProperty(data,key, {
      enumerable:true,
      configurable:true,
      /*此处不能return data[key], 因为这样会造成堆栈溢出*/
      get() {
        return value
      },
      set(newValue) {
        if(newValue === value) return;
        value = newValue
        _self.walk(newValue)  // 如果重新赋值,将基本数据类型赋值为对象,则为重新赋值的对象 添加getter/setter
      }
    })
  }
}



class MyVue {
  constructor(props) {
    this.$options = props || {}
    this.$data = props.data || {};
    this.$el = typeof props.el === 'string' ? document.querySelector(props.el) : props.el;
    this._proxy_data(props.data)
    new Observer(this.$data)
  }
  _proxy_data(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get () {
          return data[key]
        },
        set(newValue) {
          if(data[key] === newValue) return;
          data[key] = newValue
        }
      })
    })
  }
}

const my_instance = new MyVue({
  el:'#my-vue-app',
  data:{
    count:0,
    message:'Hello Vue.js',
    player:{
      firstName:'kyrie',
      lastName:'irving',
      age:30
    }
  }
})
console.log('my_instance', my_instance)


/* let obj1 = {}, age = 123;
Object.defineProperty(obj1, 'age', {
  configurable:true,
  enumerable:true,
  get() {
    return age;
  },
  set(newValue) {
    if(newValue === age) return;
    age = newValue;
  }
})

console.log(obj1, obj1.age) // 123
obj1.age = 345;
console.log(obj1.age) // 345 */

// ------------------------------- 代理对象也是键值也是对象 -------------------------------
const multiple_object = {
  count:0,
  message:'hello world',
  player:{
    name:'kyrie irving',
    age:30
  },
  singer:{
    jay:{
      firstName:'jay',
      lastName:'chou',
      age:43
    }
  },
  a:{
    b:{
      c:{
        d:1
      }
    }
  }
}
const multiple_instance = {};

function my_proxy(object) {
  function defineReactive(temp) {
    let result = {};
    Object.keys(temp).forEach(key => {
      if(typeof temp[key] === 'object') {
        const a = defineReactive(temp[key])
        result[key] = a;
      }else{
        result = Object.defineProperty(result, key, {
          enumerable: true,
          configurable:true,
          get() {
            return temp[key];
          },
          set(newValue) {
            temp[key] = newValue
          }
        })
      }
    })
    return result;
  }
  Object.keys(object).forEach(key => {
    Object.defineProperty(multiple_instance,key, {
      configurable:true,
      enumerable: true,
      get() {
        return object[key]
      },
      set(newValue) {
        object[key] = newValue;
      }
    })
    if(typeof object[key] === 'object' && object[key] !== null) {
      multiple_instance[key] = defineReactive(object[key])
    }
  })
}
my_proxy(multiple_object)
console.log(multiple_instance)
