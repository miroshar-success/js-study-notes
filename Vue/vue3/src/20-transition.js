const transition_app = createApp({
  setup () {
    const show_visible = ref(true)
    const if_visible = ref(true)
    const slide_visible = ref(true)
    const fade_visible = ref(true)
    const animation_visible = ref(true)
    const tab = ref('singer-list')
    const toggle_component = () => {
      console.log('hello')
      tab.value = tab.value === 'singer-list' ? 'player-list' : 'singer-list';
    }
    const toggle_slide = () => {
      slide_visible.value = !slide_visible.value
    }
    return {
      show_visible,
      if_visible,
      slide_visible,
      fade_visible,
      animation_visible,
      tab,
      toggle_slide,
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



// 监听两个动画
const transition_animation_app = createApp({
  setup () {
    const visible = ref(true)
    const inner_visible = ref(true)
    return {
      visible,
      inner_visible
    }
  }
})

transition_animation_app.mount('#transition-animation-app')

// js-hook
const transition_hook_app = createApp({
  setup () {
    const visible = ref(true)
    const before_enter = () => {
      console.log('before-enter')
    }
    const enter = (el, done) => {
      el.style.opacity = 0
      done()
    }
    const after_enter = (el) => {
      el.style.opacity = 1
      el.style.transition = 'opacity .4s;'
      console.log('after enter')
    }
    const enter_cancelled = () => {
      console.log('enter cancelled')
    }
    const before_leave = (el) => {
      el.style.opacity = 1
      el.style.transition = 'opacity .4s;'
      console.log('before leave')
    }
    const leave = (el, done) => {
      console.log('leave')
      done()
    }
    const after_leave = (el) => {
      el.style.opacity = 0
      console.log('after leave')
    }
    const leave_cancelled = () => {
      console.log('leave cancelled')
    }
    return {
      visible,
      before_enter,
      enter,
      after_enter,
      enter_cancelled,
      before_leave,
      leave,
      after_leave,
      leave_cancelled
    }
  }
})
transition_hook_app.mount('#transition-hook-app')



// 可复用的transition
const transition_slot_app = createApp({
  setup () {
    const visible_1 = ref(true)
    const visible_2 = ref(true)
    return {
      visible_1,
      visible_2
    }
  }
})

transition_slot_app.component('transition-component', {
  template: `<transition name='my-transition' appear>
    <slot></slot>
  </transition>`
})

transition_slot_app.mount('#transition-slot-app')
