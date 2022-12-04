const watchApp = createApp({
  data() {
    return {
      singer: {
        firstName: 'jay',
        lastName: 'chou'
      }
    }
  },
  watch: {
    'singer.firstName'(newValue, oldValue) {
    },
/*     singer(n, o) {
      console.log(n, o)
    } */
    singer: {
      handler(n, o) {
        // 只要没有替换对象本身， n和o相同
        console.log(n, o)
      },
      deep: true,
      immediate: true
    }
  },
  setup () {
    const question = ref('')
    const answer = ref('Questions usually contain a question mark. ;-)')
    watch(question, (newValue, oldValue) => {
      if (!newValue) return
      if (!newValue.includes('?')) return
      getAnswer()
    })
    const getAnswer = () => {
      answer.value = 'Thinking...'
      fetch('https://yesno.wtf/api').then(res => res.json())
      .then(res => {
        console.log(res)
      }).catch(() => {
        answer.value = 'Error! could not reach The API'
      })
    }
    // 监听对象属性
    const player = ref({
      firstName: 'kyrie',
      lastName: 'irving'
    })
    watch(player, (n, o) => {
      console.log(n, o)
    })
    return {
      question,
      answer,
      player
    }
  }
})

watchApp.mount('#watch-app')