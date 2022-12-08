const props_app = createApp({
  setup () {
    const message = 'Hello World'
    const player_list = ref([
      {
        firstName: 'kyrie',
        lastName: 'irving'
      },
      {
        firstName: 'lebron',
        lastName: 'irving'
      }
    ])
    const computer = ref({
      name: 'Apple',
      color: 'red',
      size: '8GB'
    })
    const number = ref(0)
    const increment = () => {
      number.value += 1
    }
    return {
      number,
      increment,
      message,
      player_list,
      computer
    }
  }
})
// 传递动态props
props_app.component('message-component', {
  template: `<div>{{message}}</div>`,
  props: {
    message: [String, Number]
  }
})
// 传递布尔值props
props_app.component('is-published', {
  template: `<div>{{isPublished ? '出版' : '未出版'}}</div>`,
  props: {
    isPublished: Boolean
  }
})
// 传递数组
props_app.component('player', {
  template: `<ul>
    <li v-for='player in list'>{{player.firstName}} - {{player.lastName}}</li>
  </ul>`,
  props: {
    list: Array
  }
})

// 传递对象
props_app.component('blog-post', {
  template: `<div>
    <div>name: {{author.name}}</div>
    <div>company: {{author.company}}</div>
  </div>`,
  props: {
    author: Object
  }
})

// 使用对象传递多个值
props_app.component('computer-app', {
  template: `<div>
    <div>name: {{name}}</div>
    <div>size: {{size}}</div>
    <div>color: {{color}}</div>
  </div>`,
  props: ['name', 'size', 'color']
})

// 子组件保存传递的数据 (每个组件维护自身的状态)
props_app.component('counter', {
  template: `<button @click='increment'>{{count}} --- {{initial_count}}</button>`,
  props: {
    count: Number
  },
  setup (props) {
    const initial_count = ref(props.count)
    const increment = () => {
      initial_count.value += 1
    }
    return {
      initial_count,
      increment
    }
  }
})

props_app.component('uppercase-component', {
  template: `<div>{{upper_message}}</div>`,
  props: {
    message: String
  },
  setup (props) {
    const upper_message = computed(() => props.message.toUpperCase())
    return {
      upper_message
    }
  }
})

// button
props_app.component('button-component', {
  template: `<button :class='type'>{{type}}</button>`,
  props: {
    type: String,
    validator(value) {
      return ['primary', 'default', 'danger'].includes(value)
    }
  }
})

// 传递函数
props_app.component('function-component', {
  template:`<div>
    我是子组件 <button @click='increment'>click {{number}} times</button>
  </div>`,
  props: {
    number: Number,
    increment: Function
  }
})

props_app.mount('#props-app')