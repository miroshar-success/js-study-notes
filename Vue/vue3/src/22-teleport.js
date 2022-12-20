const teleport_app = createApp({
  setup () {
    const visible = ref(false)
    const modal_visible = ref(false)
    return {
      modal_visible,
      visible
    }
  }
})

teleport_app.component('singer-modal', {
  template: `<ul>
    <li v-for='singer in singers' :key='singer'>{{singer}}</li>
  </ul>`,
  setup () {
    const singers = ['周杰伦', '王力宏', '陶喆', '林俊杰']
    return {
      singers
    }
  }
})

teleport_app.component('player-modal', {
  template: `<ul>
    <li v-for='player in players' :key='player'>{{player}}</li>
  </ul>`,
  setup () {
    const players = ['Kyrie', 'Lebron', 'Durant']
    return {
      players
    }
  }
})

teleport_app.mount('#teleport-app')