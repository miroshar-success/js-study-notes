//----------------------- v-for 基本使用 -----------------------
Vue.createApp({
  data() {
    return {
      list:[
        {
          message:'Foo'
        },
        {
          message:'Bar'
        }
      ],
      author:{
        title:'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      items:[
        {text:'Vue.js',completed:false},
        {text:'React.js',completed:true},
        {text:'Angular.js', completed:false}
      ]
    }
  }
}).mount('#foo-app')


// ----------------------- todo-list -----------------------
const todo_app = Vue.createApp({
  data () {
    return {
      todos:[],
      todo:''
    }
  },
  methods:{
    add_todo() {
      if(!this.todo) return;
      this.todos.push({
        text:this.todo,
        completed:false,
        id:Date.now()
      })
      this.todo = ''
    }
  }
})
todo_app.component('todo-item', {
  template:`<li>{{todo.text}}</li>`,
  props:{
    todo:{
      type:Object,
      required:true
    }
  }
})

todo_app.mount('#todo-list-app')


// --------------------------- 元素复用 3.x  -----------------------
Vue.createApp({
  data() {
    return {
      type:'username'
    }
  },
  methods:{
    toggle() {
      this.type = this.type === 'username' ? 'email' : 'username'
    }
  }
}).mount('#key-app')


