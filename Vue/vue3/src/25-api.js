// 创建实例 createApp (rootProps?)
const api_app = createApp({
  props: {
    count: {
      type: Number,
      default: 10
    },
    player: {
      type: String,
      required: true
    }
  },
  setup (props) {
    provide('player', props.player)
    provide('count', props.count)
    const parent_count = ref(0)
    setInterval(() => {
      parent_count.value += 1
    }, 2000)
    const counter_button = ref(null)
    const handle_click = () => {
      nextTick(() => {
        counter_button.value.increment()
      })
    }
    return {
      parent_count,
      handle_click,
      counter_button
    }
  }
}, {
  count: 1,
  player: 'kyrie'
})

const symbol_key = Symbol('provide')
api_app.provide(symbol_key, '你好生活')

api_app.component('provide-inject-component', {
  template: `<div>
    <button>{{count}}</button>
    <div>{{player}}</div>
    <div>{{message}}</div>
  </div>`,
  setup () {
    const count = inject('count')
    const player = inject('player')
    const message = inject(symbol_key)
    return {
      count,
      player,
      message
    }
  }
})

// directives
api_app.directive('focus', {
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted(el) {
    el.focus()
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  unmounted() {
    console.log('unmounted')
  }
})

// app.use()

api_app.use({
  install(app, options) {
    console.log(app, options)
  }
}, {
  name: 'plugin'
})

console.log(api_app.version)

api_app.config.errorHandler = () => {
  console.log('errorhandler')
}

api_app.config.performance = true

// nextTick
api_app.component('counter-component', {
  template: `<div>
    <button @click='increment' class='_button'>{{count}}</button>
  </div>`,
  setup () {
    const count = ref(0)
    const increment = async () => {
      count.value += 1
      console.log(document.querySelector('._button').textContent)
      await nextTick()
      console.log(document.querySelector('._button').textContent)
    }
    return {
      count,
      increment
    }
  }
})

// setup
api_app.component('setup-child-component', {
  template: `<div>
    <button @click='increment'>setup click {{count}} times --- {{parent_count}} - {{inherit_count}}</button>
  </div>`,
  props: ['parent_count', 'title'],
  setup (props, context) {
    console.log(props, context)
    const { parent_count: _count } = toRefs(props)
    const inherit_count = toRef(props, 'parent_count')
    const count = ref(0)
    const increment = () => {
      count.value += 1
    }
    return {
      count,
      parent_count: _count,
      inherit_count,
      increment
    }
  }
})

// setup 与渲染函数一起使用
api_app.component('counter-button', {
  setup (props, context) {
    const count = ref(1000)
    const increment = () => {
      count.value += 1
    }
    context.expose({
      increment
    })
    return () => h('button', count.value)
  }
})

api_app.mount('#api-app')