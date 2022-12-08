const component_event_app = createApp({
  setup () {
    const count = ref(1)
    const increment = () => {
      count.value += 1
    }
    const increment_async = () => {
      setTimeout(() => {
        count.value += 1
      },1000)
    }
    return {
      count,
      increment,
      increment_async
    }
  }
})

// @click='$emit("someEvent")'
component_event_app.component('child-component', {
  template: `
    <button @click='$emit("increment")'>click</button>
    <button @click='increment_async'>increment 1s later</button>  
  `,
  emits: ['increment_async', 'increment'],
  setup (props, context) {
    const increment_async = () => {
      context.emit('increment_async')
    }
    return {
      increment_async
    }
  }
})

component_event_app.mount('#component-event-app')
