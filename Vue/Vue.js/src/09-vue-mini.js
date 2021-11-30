/*
1. 将data中的属性转化为setter / getter
2. 将传入的属性 挂载到vue实例上,
3. 将传入的data数据 挂载到$data上,
4. 将$data中的属性 通过Object.defineProperty 变为响应式
5. 当data中的属性为普通类型,重新赋值为对象时,也设置为响应式getter/setter.
*/

/*
+ el
+ vm

compile(el)
compileElement(node)
compileText(node)
isDirective
isTextNode
isElementNode
*/
class Deep { // 观察者模式, 收集依赖
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    if(sub && sub.update) {
      this.subs.push(sub)
    }
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(vm.$el)
  }
  compile(el) { // 编译挂载元素上的子节点
    const nodes = el.childNodes;
    nodes.forEach(node => {
      if(this.isElementType(node)) {
        this.compileElement(node)
      }else if(this.isTextType(node)){
        this.compileText(node)
      }
      if(node.hasChildNodes()) {
        this.compile(node)
      }
    })
  }
  isElementType(node) {
    return node.nodeType === 1
  }
  isTextType(node) {
    return node.nodeType === 3
  }
  isDirective(attr) {
    return attr.substring(0,2) === 'v-'
  }
  compileElement(node){ // 解析指令
    for(let attribute of Object.values(node.attributes)){
      if(this.isDirective(attribute.name)) {  // 判断是否是指令
        const directiveName = attribute.name.substring(2);  // v- 指令后面的值 text model html
        this.update(node, attribute.value ,directiveName)
      }
    }
  }
  compileText(node){
    const reg = /\{\{(.+?)\}\}/; //匹配插值
    const text = node.textContent;
    if(reg.test(text)) {
      node.textContent = this.vm[RegExp.$1.trim()]
      // console.log(RegExp.$1.trim())
      new Watchers(this.vm, RegExp.$1.trim(), (newValue) => {
        node.textContent = newValue;
      })
    }
  }
  update(node, key, directiveName) { // 更新元素, 更新的值, 以及指令名 text model
    const updateFn = this[directiveName + 'Updater'];
    updateFn && updateFn.call(this,node, this.vm[key],key)
  }
  textUpdater(node, value, key) {  // 赋值 v-text
    node.textContent = value
    new Watchers(this.vm, key, (newValue) => {
      node.textContent = newValue;
    })
  }
  modelUpdater(node,value, key) {  // 赋值v-model
    node.value = value
    new Watchers(this.vm, key, (newValue) => {
      node.value = newValue;
    })
    node.addEventListener('input', (event) => {
      this.vm[key] = event.target.value;
    }, false )
  }
}


class Watchers {
  constructor(vm, key, cb) {
    this.vm = vm
    this.cb = cb;
    this.key = key
    Dep.target = this;
    this.oldValue = vm[key]
    Deep.target = null;
  }
  update() {
    const newValue = this.vm[this.key]
    if(newValue === this.oldValue) return;
    this.cb(newValue)
  }
}

class Observer {  // 处理数据为响应式
  constructor(data) {
    this.walk(data)
  }
  walk(data) {  // 将对象传递defineReactive, 转换为getter/setter
    if(!(typeof data === 'object' && data !== null)) return;
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {  // 将属性转为getter/setter
    const _self = this;
    const dep = new Deep()
    this.walk(value)  // 将值为object的 下面的 属性值也转换为getter/setter
    Object.defineProperty(data,key, {
      enumerable:true,
      configurable:true,
      /*此处不能return data[key], 因为这样会造成堆栈溢出*/
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        if(newValue === value) return;
        value = newValue
        _self.walk(newValue)  // 如果重新赋值,将基本数据类型赋值为对象,则为重新赋值的对象 添加getter/setter
        dep.notify()
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
    new Compiler(this)
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
    },
    text:'hello world',
    html:'<h1>Hello World</h1>',
    model:'model-value'
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

