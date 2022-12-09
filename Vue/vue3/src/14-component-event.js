const component_event_app = createApp({
  setup () {
    const count = ref(1)
    const message = ref('hello, world')
    const increment = () => {
      count.value += 1
    }
    const increment_async = () => {
      setTimeout(() => {
        count.value += 1
      },1000)
    }
    const click_once = () => {
      count.value += 1
    }
    const increment_with_message = (message) => {
      console.log(message)
    }
    const add_with_message = (count) => {
      console.log(count)
    }
    const validate = (payload) => {
      console.log('触发了吗?')
    }
    const validate_player = (payload) => {
      console.log(payload)
    }
    return {
      count,
      message,
      increment,
      click_once,
      increment_async,
      increment_with_message,
      add_with_message,
      validate,
      validate_player
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


// son-component
component_event_app.component('son-component', {
  template: `<div>
    <button @click='increment'>携带参数触发子组件</button>
    <button @click='$emit("add", 123)'>第二种方式</button>
  </div>`,
  emits: ['increment', 'add'], // 显式地声明
  setup(props, context) {
    const increment = () => {
      context.emit('increment', {
        message: 'hello'
      })
    }
    return {
      increment
    }
  }
})

// 验证触发子组件传递的参数

class Player {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}


component_event_app.component('validate-event-component', {
  template: `<div>
    <button @click='validate'>validate</button>
    <button @click='validate_player'>player validate</button>
  </div>`,
  emits: {
    validate(payload) {
      console.log(payload)
      return typeof payload === 'number'
    },
    validate_player(payload) {
      return payload instanceof Player
    }
  },
  setup (props, context) {
    const validate = () => {
      context.emit('validate', 123)
    }
    const validate_player = () => {
      context.emit('validate_player', new Player('kyrie', 'irving'))
    }
    return {
      validate,
      validate_player
    }
  }
})


// v-model 在组件上的使用
component_event_app.component('search-input', {
  template: `<div class='input-wrapper'>
    <input type='text' :value='modelValue' @input='input' class='input'>
  </div>`,
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const input = (event) => {
      context.emit('update:modelValue', event.target.value)
    }
    return {
      input
    }
  }
})


component_event_app.mount('#component-event-app')
