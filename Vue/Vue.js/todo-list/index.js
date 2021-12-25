const { createApp, ref, computed, watchEffect } = Vue;

function parse(str){
  let value;
  try{
    value = JSON.parse(str)
  }catch{
    value = null
  }
  return value
}

function stringify(obj){
  let value
  try{
    value = JSON.stringify(obj)
  }catch{
    value = null
  }
  return value
}


function useLocalStorage() {
  function setItem(key, value){
    const v = stringify(value)
    window.localStorage.setItem(key, v)
  }
  function getItem(key){
    let v = window.localStorage.getItem(key)
    console.log('v',v)
    if(v){
      v = parse(v)
    }else{
      v = []
    }
    return v
  }
  return {
    setItem,
    getItem
  }
}

const KEY = 'todo_list';

const app = createApp({
  setup(){
    const { setItem, getItem } = useLocalStorage()
    const todo = ref('')
    const list = ref(getItem(KEY) || [])
    const filter = ref('all')
    function add(){ // 添加todo
      if(!todo.value) return;
      list.value.unshift({
        text:todo.value,
        completed:false,
        id:new Date().getTime()
      })
      todo.value = ''
    }

    function delete_todo(id){
      const index = list.value.findIndex(todo => todo.id === id)
      if(index > -1) {
        list.value.splice(index,1)
      }
    }

    function confirm(todo){
      const { text, id } = todo;
      const index = list.value.findIndex(t => t.id === id)
      if(index < 0) return;
      if(text){
        list.value[index].text = text
      }else{
        list.value.splice(index,1)
      }
    }

    const toggle_all = computed({
      get() {
        if(!list.value.length) return false
        return !list.value.filter(todo => !todo.completed).length
      },
      set(value){
        console.log('value', value)
        list.value.forEach(todo => {
          todo.completed = value
        })
      }
    })

    function toggle_filter(f){
      filter.value = f
    }

    const filterTodo = computed(() => {
      switch(filter.value){
        case 'all':
          return list.value;
        case 'active':
          return list.value.filter(todo => !todo.completed)
        case 'completed':
          return list.value.filter(todo => todo.completed)
      }
    })

    const unfinishedLength = computed(() => {
      return list.value.filter(todo => !todo.completed).length
    })

    watchEffect(() => {
      setItem(KEY,list.value)
    })

    return {
      todo,
      list,
      add,delete_todo, confirm,
      toggle_all,
      toggle_filter,filter,filterTodo,unfinishedLength
    }
  }
})


// ---------------- todo-list 列表组件-----------------
app.component('todo-list', {
  template:`<ul>
    <li
      v-for='todo in list' :key='todo.id'
      class='todo-item'
      :class='{isEdit:todo === beforeTodo}'
    >
      <div class='left' @dblclick.stop='toggle_todo(todo)'>
        <input type='checkbox' v-model='todo.completed'>
        <span class='text' :class='{completed:todo.completed}'>{{todo.text}}</span>
      </div>
      <span class='close' @click.stop='delete_todo(todo.id)'>X</span>
      <input
        type='text'
        v-model='todo.text'
        class='edit-input'
        @keyup.enter='confirm' @blur='confirm'
        v-focus = 'todo === beforeTodo'
      >
    </li>
  </ul>`,
  props:{
    list:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  emits:['del', 'confirm'],
  setup(props,context){
    const beforeTodo = ref(null)  // 编辑之前的todoText
    function delete_todo(id){
      context.emit('del', id)
    }
    function toggle_todo(todo){
      beforeTodo.value = todo;
    }

    function confirm(){ //编辑完成确认
      context.emit('confirm', beforeTodo.value)
      beforeTodo.value = null;
    }

    return {
      delete_todo,
      beforeTodo,
      toggle_todo,
      confirm
    }
  },
  directives:{
/*     focus:{
      mounted(el, binding){
        console.log(el,binding)
        binding.value && el.focus()
      },
      created(){
        console.log('created')
      },
      beforeMount(){
        console.log('beforeMount')
      },
      mounted(){
        console.log('mounted')
      },
      beforeUpdate(){
        console.log('beforeUpdate')
      },
      updated(){
        console.log('updated')
      },
      beforeUnmount(){
        console.log('beforeUnmount')
      },
      unmounted(){
        console.log('unmounted')
      }
    } */
    focus:(el,binding) => {
      binding.value && el.focus()
    }
  }
})

// ----------------- 切换todo----------
app.component('filter-link',{
  template:`<span
    class='filter-link'
    v-for="(f) in filters"
    :key='f'
    :class='{active:f === filter}'
    @click='switch_filter(f)'
  >{{f}}</span>`,
  emits:['switch'],
  setup(props, context){
    const filters = ['all','active','completed']
    function switch_filter(f){
      context.emit('switch',f)
    }
    return {
      filters,
      switch_filter
    }
  },
  props:{
    filter:{
      type:String,
      default:'all'
    }
  }
})
app.mount('#app')
