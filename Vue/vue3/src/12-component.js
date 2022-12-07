// 局部组册
const child_component = {
  template: `<div>我是一个局部注册的字组件 <button @click='count++'>click {{count}} times</button></div>`,
  setup () {
    const count = ref(0)
    console.log('I am child component')
    return {
      count
    }
  }
}

const component_app = createApp({
  components: {
    ChildComponent: child_component
  },
  setup () {
    const blog_list = ref([
      {
        id: 1,
        title: 'My journey with Vue'
      },
      {
        id: 2,
        title: 'Blogging with Vue'
      },
      {
        id: 3,
        title: 'Why Vue is so fun'
      }
    ])
    const tab_component = ref('player')
    const fontSize = ref(1)
    const large = () => {
      fontSize.value += 0.5
    }
    return {
      tab_component,
      large,
      fontSize,
      blog_list
    }
  }
})

component_app.component('button-component', {
  template: `<button @click='increment'>click {{count}} times</button>`,
  setup () {
    const count = ref(0)
    const increment = () => {
      count.value += 1
    }
    return {
      count,
      increment
    }
  }
})

component_app.component('blog-post', {
  template: `<div>{{title}} ---- <button @click='large'>enlarge text</button></div>`,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: ['enlarge'],
  setup (props, context) {
    const large = () => {
      context.emit("enlarge")
    }
    return {
      large
    }
  }
})

// 插槽
component_app.component('alert-box', {
  template: `<div>
    <strong>This is an Error for Demo Purposes</strong>
    <slot></slot>
  </div>`
})


// 动态组件
component_app.component('player', {
  template: `<ul>
    <li v-for='player in player_list' :key='player'>{{player}}</li>
  </ul>`,
  setup () {
    const player_list = ref(['kyrie', 'lebron', 'durant'])
    return {
      player_list
    }
  }
})

component_app.component('singer', {
  template: `<ul>
    <li v-for='singer in singer_list' :key='singer'>{{singer}}</li>
  </ul>`,
  setup () {
    const singer_list = ref(['周杰伦', '王力宏', '陶喆'])
    return {
      singer_list
    }
  }
})


component_app.mount('#component-app')