const router_app = createApp({
  setup () {
    const hash = ref('home')
    const listen_hashchange = () => {
      hash.value = document.location.hash.slice(1)
    }
    const component_view = computed(() => `${hash.value}-component`)
    onMounted(() => {
      window.addEventListener('hashchange', listen_hashchange, false)
    })
    return {
      component_view
    }
  }
})

router_app.component('home-component', {
  template: `<div>Hello World, 我是首页</div>`
})

router_app.component('about-component', {
  template: `<div>Hello, 我是详情页</div>`
})

router_app.mount('#router-app')