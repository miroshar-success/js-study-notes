const transition_app = createApp({
  setup () {
    const show_visible = ref(true)
    const if_visible = ref(true)
    const tab = ref('singer-list')
    const toggle_component = () => {
      console.log('hello')
      tab.value = tab.value === 'singer-list' ? 'player-list' : 'singer-list';
    }
    return {
      show_visible,
      if_visible,
      tab,
      toggle_component
    }
  }
})

transition_app.component('player-list', {
  template: `<ul>
    <li v-for='player in player_list' :key='player'>{{player}}</li>
  </ul>`,
  setup () {
    const player_list = ref([
      'kyrie', 'durant', 'lebron', 'wade'
    ])
    return {
      player_list
    }
  }
})

transition_app.component('singer-list', {
  template: `<ul>
    <li v-for='singer in singer_list' :key='singer'>{{singer}}</li>
  </ul>`,
  setup () {
    const singer_list = ref(['周杰伦', '王力宏', '陶喆', '林俊杰'])
    return {
      singer_list
    }
  }
})


transition_app.mount('#transition-app')