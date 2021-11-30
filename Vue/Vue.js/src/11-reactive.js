class Deep {
  constructor(){
    this.subs = [];
  }
  add(sub){
    if(sub && sub.update){
      this.subs.push(sub)
    }
  }
  notify(){
    this.subs.length > 0 && this.subs.forEach(sub => {
      sub.update()
    })
  }
}

class Watcher {
  update(){
    console.log('hello, 我要更新了')
  }
}

const w1 = new Watcher()
const w2 = new Watcher()
const deep = new Deep()
deep.add(w1)
deep.add(w2)

deep.notify()



/* const object = {
  count:1
}

Object.defineProperty(object, 'count', {
  get() {
    console.log('get')
    return object['count']
  },
  set(newValue) {
    console.log('set:', newValue)
    object.count = newValue
  }
})
// object.count = 3 */

const object = {
  count:1
}

const vm = Object.defineProperty({},'count', {
  get() {
    console.log('after:', object.count)
    return object.count
  },
  set(newValue) {
    if(object.count === newValue) return
    console.log('set:',newValue, 'before:',object.count)
    object.count = newValue
  }
})

// console.log(vm.count)
vm.count = 10;
vm.count = 10



// ------------------ array ------------------
const instance = new Vue({
  el:"#root",
  data() {
    return {
      players:['kyrie','durant','james','durant'],
      singers:[
        {
          firstName:'jay',
          lastName:'chou',
          age:30
        }
      ]
    }
  },
  created() {
    console.log(this.players)
  },
  methods: {
    change_player() {
      this.players[0] = 'hello world';
      console.log(this.players)
    },
    change_age() {
      this.singers[0].age = 40
    }
  }
})

// ------------------------- computed 为 函数 ---------------------
new Vue({
  el:'#computed',
  data() {
    return {
      count:0,
      firstName: 'kyrie',
      lastName: 'irving'
    }
  },
  computed:{
    fullName() {
      console.log('computed1')
      return this.firstName + '-' + this.lastName
    },
    fullName2() {
      return function(lastName) {
        console.log('computed2')
        return this.firstName + '-' + lastName
      }
    }
  },
  methods: {
    click() {
      this.count+=1;
    }
  }
})


const player = {
  firstName:'jay',
  lastName:'chou',
  age:30
}

const SingerObject = document.querySelector('.singer-object')

function createElement() {
  const fragment = document.createDocumentFragment()
  for(let key of Object.keys(player)){
    const li = document.createElement('div')
    li.textContent = `${key}-${player[key]}`
    fragment.appendChild(li)
  }
  SingerObject.appendChild(fragment)
}
createElement()

// ----------- vue virtual dom -----------
const instance_1 = new Vue({
  el:'#virtual-dom',
  data() {
    return {
      message: 'hello world',
    }
  },
  // render(h) {
  //   const VNode = h('div',this.message)
  //   console.log(VNode)
  //   return VNode
  // },
})

console.log('instance_1:', instance_1.$data.message)


// ------------------- vue-component ------------------
const my_component = Vue.component('my-component',{
  data(){
    return {
      message: 'my-component'
    }
  },
  template:`<div>{{this.message}}</div>`
})

const my_component_instance = new my_component({
  name:'my-component',
  data() {
    return {
      message:'你好,生活'
    }
  },
}).$mount('#extend')
console.log('component_instance',my_component_instance)


const player_vue = Vue.extend({
  template:`<div>{{this.message}}</div>`,
  data() {
    return {
      message:'hello world'
    }
  }
})

new player_vue({
  el:'#player-app',
  data() {
    return {
      message:'我是extend组件'
    }
  }
})


const component_instance = new Vue({
  el:"#app-component"
})
console.log('instance:', component_instance)
// console.log(Vue.options)


// --------------- Vue-directive --------------
new Vue({
  el: '#directive-component',
  data () {
    return {
      message:'hello world'
    }
  },
  filters:{
    reverseMessage(v) {
      if(!v) return;
      console.log('v', v)
      return v.split(' ').reverse().join(' ')
    }
  }
})

// ------------ 两种方式创建dialog ---------------
const Dialog = Vue.extend({
  template:`<div class='dialog'>{{message}}</div>`,
  data() {
    return {
      message:'登陆'
    }
  }
})
// new Dialog({
//   el:'#dialog-app'
// })

// const Dialog_1 = Vue.component('dialog-component',{
//   template:`<div class='dialog'>{{message}}</div>`,
//   data() {
//     return {
//       message:'登陆'
//     }
//   }
// })
// new Dialog_1({
//   el:'#dialog-1',
// })

const player_1 = {
  firstName:'kyrie',
  lastName:'irving',
  age:30
}
const proxy_player = new Proxy(player_1,{
  set(target,key,value){
    console.log(target,key,value)
    target[key] = value;
  }
})
proxy_player.age = 20
console.log(proxy_player)


