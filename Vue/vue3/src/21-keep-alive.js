const keep_alive_app = createApp({
  setup () {
    const active = ref('counter')
    const toggle_component = () => {
      active.value = active.value === 'counter' ? 'message-component' : 'counter'
    }
    return {
      active,
      toggle_component
    }
  }
})

keep_alive_app.component('counter', {
  name: 'counter',
  template: `<div>
    <button @click='handle_click'>click {{count}} times</button>
  </div>`,
  setup () {
    const count = ref(0)
    const handle_click = () => {
      count.value += 1
    }
    Vue.onActivated(() => {
      console.log('counter activated')
    })
    Vue.onDeactivated(() => {
      console.log('counter deactivated')
    })
    return {
      count,
      handle_click
    }
  }
})

keep_alive_app.component('message-component', {
  name: 'message-component',
  template: `<div>
    <input type='text' v-model.trim='message'> {{message}}
  </div>`,
  setup () {
    const message = ref('')
    Vue.onActivated(() => {
      console.log('message activated')
    })
    Vue.onDeactivated(() => {
      console.log('message deactivated')
    })
    return {
      message
    }
  }
})

keep_alive_app.mount('#keep-alive-app')