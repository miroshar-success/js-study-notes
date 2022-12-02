const first_app = createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    click() {
      this.count += 1
    }
  }
})

console.log('first-app', first_app)

first_app.mount('#first-app')