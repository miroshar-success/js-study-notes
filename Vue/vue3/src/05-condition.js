const condition_app = createApp({
  setup () {
    const awesome = ref('awesome')
    const show = ref(true)
    const visible = ref(true)
    return {
      awesome,
      show,
      visible
    }
  }
})

condition_app.mount('#condition-app')