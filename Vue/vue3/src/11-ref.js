const refApp = createApp({
  setup () {
    const input = ref(null)
    const count = ref(0)
    const items = ref(['kyrie', 'irving', 'lebron', 'james'])
    const itemElements = ref([])
    const child = ref(null)
    onMounted(() => {
      if (input.value) {
        input.value.focus()
      }
      console.log('items-array', items.value)
      nextTick(() => {
        console.log('ref-component', child.value)
      })
    })
    const getItem = (item) => {
      if (item) {
        console.log('hello')
        itemElements.value.push(item)
      }
    }
    // 调用子组件
    const child_click = () => {
      nextTick(() => {
        child.value.increment()
        console.log(child.value.count)
      })
    }
    return {
      items,
      getItem,
      child_click,
      count,
      child,
      input
    }
  },
  mounted() {
    console.log(this.$refs.input)
    console.log(this.$refs.items)
  }
})

refApp.component('child-component', {
  template: `<div>
    <span>Hello World!</span>
    <span>你好, 世界</span>
    <button @click.stop='increment'>increment {{count}}</button>
    <button @click.stop='increment_double'>increment double {{count}}</button>
    <button @click.stop='increment_async'>increment async {{count}}</button>
  </div>`,
  expose: ['increment', 'count'],
  setup () {
    const count = ref(0)
    const increment = () => count.value++
    const increment_double = () => count.value += 2
    const increment_async = () => {
      setTimeout(() => {
        count.value += 1
      }, 1500)
    }
    return {
      increment,
      increment_double,
      increment_async,
      count
    }
  }
})

refApp.mount('#ref-app')