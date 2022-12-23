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

api_app.mount('#api-app')