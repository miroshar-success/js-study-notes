const formApp = createApp({
  setup () {
    const text = ref('hello')
    const message = ref('Hello World')
    const textarea = ref('textarea')
    const checked = ref(true)
    const players = [
      {
        firstName: 'kyrie',
        lastName: 'irving',
        id: 1
      },
      {
        firstName: 'lebron',
        lastName: 'james',
        id: 2
      },
      {
        firstName: 'kevin',
        lastName: 'durant',
        id: 3
      }
    ]
    const checkedPlayer = ref([])
    const radioPlayer = ref([])
    const selectedPlayer = ref(0)
    const toggle = ref(false)
    const dynamicTrueValue = ref('hello')
    const dynamicFalseValue = ref('world')
    const dynamicToggle = ref(dynamicTrueValue.value)
    const sex = ref(1)

    // 事件修饰符
    const lazyMessage = ref('你好 生活')
    const age = ref(10)
    return {
      age,
      text,
      selectedPlayer,
      message,
      textarea,
      checked,
      checkedPlayer,
      radioPlayer,
      players,
      toggle,
      sex,
      dynamicToggle,
      dynamicTrueValue,
      dynamicFalseValue,
      lazyMessage
    }
  }
})

formApp.mount('#form-app')