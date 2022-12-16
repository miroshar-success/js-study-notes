const useMouse = () => {
  const x = ref(0)
  const y = ref(0)
  const listen_mouse = (event) => {
    x.value = event.clientX
    y.value = event.clientY
  }
  onMounted(() => {
    document.addEventListener('mousemove', listen_mouse, false)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', listen_mouse, false)
  })
  return {
    x,
    y
  }
}

const useEventListener = (target, event, callback) => {
  onMounted(() => {
    if (target.value) {
      target.value.addEventListener(event, callback, false)
    }
  })
  onUnmounted(() => {
    target.removeEventListener(event, callback, false)
  })
}

// 异步获取数据
const useFetch = () => {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)
  setTimeout(() => {
    if (Math.random() > 0.5) {
      data.value = ['hello', 'world']
    } else {
      error.value = '错误。。。。。。'
    }
    loading.value = false
  }, 3000)
  return {
    data,
    error,
    loading
  }
}

const useCounter = (counter) => {
  const log = () => {
    console.log(counter.value)
  }
  if (Vue.isRef(counter)) {
    Vue.watchEffect(log)
  } else {
    log()
  }
}


// 异步hook
const usePlayer = () => {
  const players = ref([])
  const spinning = ref(true)
  const get_players = () => {
    setTimeout(() => {
      players.value = [
        {
          firstName: 'kyrie',
          lastName: 'irving'
        },
        {
          firstName: 'kevin',
          lastName: 'durant'
        },
        {
          firstName: 'lebron',
          lastName: 'james'
        }
      ]
      spinning.value = false
    }, 3000)
  }
  get_players()
  return {
    players,
    spinning
  }
}


const useAsyncCounter = (data) => {
  const counter = ref(3)
  Vue.watchEffect(() => {
    counter.value = counter.value * data.value
  })
  return counter
}


const setup_app = createApp({
  setup () {
/*     const x = ref(0)
    const y = ref(0)
    const listen_mouse = (event) => {
      x.value = event.pageX
      y.value = event.pageY
    }
    onMounted(() => {
      document.addEventListener('mousemove', listen_mouse, false)
    })
    onUnmounted(() => {
      document.addEventListener('mousemove', listen_mouse, false)
    })
    return {
      x,
      y
    } */
    const counter = ref(0)
    const { x, y } = useMouse()
    const button = ref(null)
    const listen_click = () => {
      console.log('click')
    }
    useCounter(counter)
    useEventListener(button, 'click', listen_click)
    const { data, error, loading } = useFetch()
    const increment = () => {
      counter.value += 1
    }
    const multiple = ref(2)
    // 获取异步数据
    const { spinning, players } = usePlayer()
    const async_multiple_counter = useAsyncCounter(multiple)
    setTimeout(() => {
      multiple.value += 1
    },2000)
    return {
      increment,
      data,
      error,
      x,
      y,
      button,
      counter,
      loading,
      spinning,
      players,
      async_multiple_counter
    }
  }
})

setup_app.mount('#setup-app')