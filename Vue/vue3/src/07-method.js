const methodApp = createApp({
  setup () {
    const count = ref(0)
    const name = ref('Vue.js')
    const getName = (event) => {
      alert(`Hello ${name.value}`)
    }
    const say = (message) => {
      alert(message)
    }
    const getEvent = (message, event) => {
      console.log(message, event)
    }
    // 事件修饰符
    const playerList = ref([
      {
        firstName: 'kyrie',
        lastName: 'irving',
        id: 1
      },
      {
        firstName: 'lebron',
        lastName: 'james',
        id: 2
      }
    ])
    const ulClick = () => {
      console.log('ul click')
    }
    const playerClick = () => {
      console.log('li click')
    }
    const jump = () => {
      console.log('link clicked')
    }
    // 事件修饰符 .self
    const parentClick = () => {
      console.log('parent click')
    }
    const childClick = () => {
      console.log('child click')
    }
    const message = ref('hello')
    const search = () => {
      console.log('search')
    }
    const tab = () => {
      console.log('tab')
    }
    return {
      count,
      message,
      name,
      getName,
      say,
      getEvent,
      playerList,
      playerClick,
      ulClick,
      jump,
      parentClick,
      childClick,
      search,tab
    }
  }
})

methodApp.mount('#method-app')