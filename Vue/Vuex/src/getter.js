const getter_store = Vuex.createStore({
  state(){
    return {
      todos:[
        {
          text:'vue.js',
          id:1,
          done:true
        },
        {
          text:'vuex.js',
          id:2,
          done:true
        },
        {
          text:'react.js',
          id:3,
          done:true
        },
        {
          text:'angular.js',
          id:4,
          done:false
        }
      ]
    }
  },
  getters:{
    // getter 可以接收第二个参数
    doneTodos:state => state.todos.filter(todo => todo.done),
    // 通过getter返回一个函数
    getTodoById:state => id => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})

Vue.createApp({
  computed:{
    ...Vuex.mapGetters(['doneTodos']),
    ...Vuex.mapState(['todos'])
  }
}).use(getter_store).mount('#getter-demo')


console.log(getter_store.getters.getTodoById(2))
