const setup_api_app = createApp({
  setup () {
    const count = ref(1)
    const double = computed(() => count.value * 2)
    const player = reactive({
      firstName: 'kyrie',
      lastName: 'irving',
      age: 31
    })
    const increment = () => {
      count.value += 1
    }
    const tribble = computed({
      get: () => count.value * 3,
      set: (v) => count.value = v
    })
    setTimeout(() => {
      player.age = 32
    }, 1000)
    // watchEffect
    const clean = watchEffect((onCleanUp) => {
      console.log(tribble.value)
    })
    return {
      count,
      double,
      increment,
      tribble,
      player
    }
  }
})

setup_api_app.mount('#setup-api-app')