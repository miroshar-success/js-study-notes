const { createApp, ref } = Vue;

const app = createApp({
  setup(){
    const todo = ref('')
    const list = ref([])
    function add(){ // 添加todo
      if(!todo) return;
      list.value.unshift({
        text:todo.value,
        completed:false,
        id:new Date().getTime()
      })
      todo.value = ''
    }
    return {
      todo,
      list,
      add
    }
  }
})


// ---------------- todo-list 列表组件-----------------
app.component('todo-list', {
  template:`<ul>
    <li v-for='todo in list' :key='todo.id' class='todo-item'>
      <input type='checkbox'>
      <span>{{todo.text}}</span>
    </li>
  </ul>`,
  props:{
    list:{
      type:Array,
      default:function(){
        return []
      }
    }
  }
})

app.mount('#app')
