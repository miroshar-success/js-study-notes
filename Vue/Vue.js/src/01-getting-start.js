// ----------------------------声明式渲染 ----------------------------
const Counter = {
  data() {
    return {
      counter:0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter += 1;
    },2000)
  }
}
Vue.createApp(Counter).mount('#getting-start')


//------------------------------------ v-bind----------------------------
const AttributeBinding = {
  data() {
    return {
      message:`You loaded this page on ${new Date().toLocaleString()}`
    }
  }
}
Vue.createApp(AttributeBinding).mount('#bind-attribute')

// ------------------------ event-handling ------------------------
const EventHandling = {
  data() {
    return {
      message:'Hello Vue.js'
    }
  },
  methods:{
    reverse_message() {
      this.message = this.message.split('').reverse().join('')
    }
  }
}
Vue.createApp(EventHandling).mount('#event-handling')

// ---------------------------------- 表单绑定  ----------------------------------
const TwoWayBinding = {
  data() {
    return {
      message:'hello world'
    }
  }
}
Vue.createApp(TwoWayBinding).mount('#two-way-binding')

//---------------------------- 条件与循环 ----------------------------
const ConditionalRendering = {
  data() {
    return {
      visible:true
    }
  },
  methods:{
    toggle() {
      this.visible = !this.visible
    }
  }
}
Vue.createApp(ConditionalRendering).mount('#conditional-rendering')

// ------------------------------ 循环  ------------------------------
const ListRendering = {
  data() {
    return {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ]
    }
  }
}

Vue.createApp(ListRendering).mount('#list-rendering')

// ------------------ component 局部组件-------------------
const TodoItem = {
  template:`<li>This is a toto-item component</li>`
}
const app = Vue.createApp({
  data(){
    return {
      message:'你好生活'
    }
  },
  components:{
    TodoItem
  }
})
app.mount('#app')

// ------------------------- 组件传递参数  app下注册的组件-------------------------
const list_app = Vue.createApp({
  data() {
    return {
      todos:[
        {text:'Vue.js'},
        {text:'React.js'},
        {text:'Angular.js'}
      ]
    }
  }
})
console.log('list_app:', list_app)
list_app.component('todo-item',{
  props:['todo'],
  template:`<li>{{todo.text}}</li>`
})
const instance = list_app.mount('#list-app')
console.log('instance:', instance.todos)
