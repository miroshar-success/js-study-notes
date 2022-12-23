const counter_store = reactive({
  count: 0
})

const store_app = createApp({
  setup () {
    const click = () => {
      counter_store.count += 1
    }
    return {
      click
    }
  }
})

store_app.component('component-a', {
  template: `<button @click='click'>{{counter_store.count}} times</button>`,
  name: 'component-a',
  setup () {
    const click = () => {
      counter_store.count += 1
    }
    return {
      click,
      counter_store
    }
  }
})

store_app.component('component-b', {
  template: `<button @click='click'>{{counter_store.count}} times</button>`,
  name: 'component-b',
  setup () {
    const click = () => {
      counter_store.count += 1
    }
    return {
      click,
      counter_store
    }
  }
})

store_app.mount('#store-app')