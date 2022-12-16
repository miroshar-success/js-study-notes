const focus = {
  created(el, binding, vnode) {
    console.log('created', el, binding, vnode)
  },
  beforeMount(el, binding, vnode, preVnode) {
    console.log('beforeMount', el, binding, vnode, preVnode)
  },
  mounted: el => el.focus(),
  beforeUpdate(el, binding, vnode, preVnode) {
    console.log('beforeUpdate', el, binding, vnode, preVnode)
  },
  updated(el, binding, vnode, preVnode) {
    console.log('updated', el, binding, vnode, preVnode)
  }
}

const directive_app = createApp({
  setup () {
    const count = ref(0)
    const increment = () => {
      count.value += 1
    }
    return {
      count,
      increment
    }
  },
  directives: {
    focus,
    example: {
      mounted(el, binding, vnode, preVnode) {
        console.log(el, binding, vnode, preVnode)
      }
    }
  }
})

directive_app.use({
  install: (app, options) => {
    console.log('app options',app, options)
    app.config.globalProperties.upperCase = (key) => {
      return key.toUpperCase()
    }
  }
})

directive_app.mount('#directive-app')