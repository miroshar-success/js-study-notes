const condition_app = createApp({
  setup () {
    const player_list = ref([
      {
        firstName: 'kyrie',
        lastName: 'irving',
        age: 32
      },
      {
        firstName: 'lebron',
        lastName: 'james',
        age: 38
      }
    ])
    return {
      player_list
    }
  }
})

condition_app.mount('#condition-app')

// --------------------- watch --------------------
const watch_app = createApp({
  setup() {
    const count = ref(0)
    const count_button = ref(null)
    const increment = () => {
      count.value += 1
    }
    return {
      count,
      count_button,
      increment
    }
  },
  watch: {
    count: {
      handler(newValue, oldValue) {
        console.log('hello', newValue, oldValue, this.count_button)
      }
    }
  }
})
watch_app.mount('#watch-app')

// ---------------------- form --------------------
const form_app = createApp({
  setup () {
    const checked = ref('no')
    const radio_checked = ref('hello')
    return {
      checked,
      radio_checked
    }
  }
})
form_app.mount('#form-app')

// ------------------- 绑定多个事件 -------------
const multiple_event_app = createApp({
  setup () {
    const count = ref(0)
    const increment = () => {
      console.log('increment')
      count.value += 1
    }
    const decrement = () => {
      console.log('decrement')
      count.value -= 2
    }
    return {
      increment,
      decrement,
      count
    }
  }
})
multiple_event_app.mount('#multiple-event')

// -----------------ref---------------
const ref_app = createApp({
  setup () {
    const player_list = ref([
      {
        firstName: 'kyrie',
        lastName: 'irving'
      },
      {
        firstName: 'lebron',
        lastName: 'james'
      },
      {
        firstName: 'kevin',
        lastName: 'durant'
      }
    ])
    const setLiRef = (ele) => {
      console.log(ele)
    }
    return {
      player_list,
      setLiRef
    }
  },
  mounted() {
    console.log(this.$refs.li)
  }
})
ref_app.mount('#ref-app')

// ----------- hook -------
const useMousePosition = () => {
  const x = ref(0)
  const y = ref(0)
  onMounted(() => {
    document.addEventListener('mousemove', event => {
      x.value = event.clientX
      y.value = event.clientY
    }, false)
  })
  return {
    x,
    y
  }
}

const hook_app = createApp({
  setup () {
    const {x, y} = useMousePosition()
    return {
      x,
      y
    }
  }
})
hook_app.mount('#hook-app')

// -------------------table------------

const PlayerTr = {
  props: ['list'],
  template: `<tr v-for='(p,i) in list'>
    <td>{{i+1}}</td><td>{{p}}</td>
  </tr>`
}

const table_app = createApp({
  setup() {
    const list = ['wade', 'durant', 'james']
    return {
      list
    }
  },
  components:{
    PlayerTr
  }
})
table_app.mount('#table-app')


const watch_effect_app = createApp({
  setup () {
    const count = ref(0)
    const increment = () => {
      count.value += 1
    }
    watch(count, (newValue) => {
      console.log('watch:', newValue)
    })
    const cancel = watchEffect(function() {
      console.log('count', count.value)
    })
    setTimeout(() => {
      cancel()
    }, 5000)
    return {
      count,
      increment
    }
  }
})
console.log(watch_effect_app)
const instance = watch_effect_app.mount('#watch-effect-app')
console.log(instance)