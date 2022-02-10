// -------- 插槽 -------
const slot_app = Vue.createApp({
  data() {
    return {
      message: 'hello world'
    }
  }
})

slot_app.component('todo-button', {
  template:`<button><slot></slot> {{count}}</button>`,
  data() {
    return {
      count:0
    }
  }
})

slot_app.mount('#slot-scope')



// ------------- 渲染作用域 -----------
const scope_app = Vue.createApp({
  data() {
    return {
      message:'我是父作用域的数据'
    }
  }
})

scope_app.component('scope-button', {
  template:`<button><slot>备用内容</slot></button>`,
  data() {
    return {
      message:'我是子组件的数据'
    }
  }
})

scope_app.mount('#slot-button')


// -------------- 具名插槽 -------------
const layout_app = Vue.createApp({

})

layout_app.component('base-layout', {
  template:`<div>
    <header><slot name='header'></slot></header>
    <main><slot name='main'></slot></main>
    <footer><slot name='footer'></slot></footer>
  </div>`
})

layout_app.mount('#layout-app')


// ---------- 插槽作用域 ---------
const slot_scope_app = Vue.createApp({
})

slot_scope_app.component('todo-list', {
  data() {
    return {
      items:['Feed a cat', 'Buy milk']
    }
  },
  template:`<ul>
    <li v-for='item in items'>{{item}}</li>
  </ul>`
})

slot_scope_app.component('player-list', {
  data() {
    return {
      players:['kyrie', 'durant', 'james']
    }
  },
  template:`<ul>
    <li v-for='item in players'>
      <slot :item='item'></slot>
    </li>
  </ul>`
})



slot_scope_app.mount('#slot-scope-app')
