const component_event_app = createApp({
  setup () {
    const count = ref(1)
    const message = ref('hello, world')
    const first_name = ref('kyrie')
    const last_name = ref('irving')
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
      validate_player,
      first_name,
      last_name
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

// custom-input
// v-model 在组件上使用默认都是 modelValue 作为prop
component_event_app.component('custom-input', {
  template: `<input type='text' v-model='value' style='border:1px solid red;'>`,
  props: {
    modelValue: {
      type: [Number, String],
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})

// 绑定多个 v-model
component_event_app.component('user-name', {
  template: `<div>
    <input type='text' :value='firstName' @input='handle_input("firstName", $event)'>
    <input type='text' :value='lastName' @input='handle_input("lastName", $event)'>
  </div>`,
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName'],
  setup (props, context) {
    const handle_input = (type, event) => {
      context.emit(`update:${type}`, event.target.value)
    }
    return {
      handle_input
    }
  }
})

// 自定义修饰符
component_event_app.component('capitalize-input', {
  template: `<input type='text' :value='modelValue' @input='handleInput' style='border:1px solid blue;'>`,
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers)
  },
  setup (props, context) {
    const handleInput = (event) => {
      console.log(props.modelModifiers.capitalize)
      let val = event.target.value
      if (props.modelModifiers.capitalize) {
        val = val.substring(0, 1).toUpperCase() + val.slice(1)
      }
      context.emit('update:modelValue', val)
    }
    return {
      handleInput
    }
  }
})

// 自定义修饰符 + arg
component_event_app.component('title-component', {
  template: `<input type='text' :value='title' @input='handleInput'>`,
  props: {
    title: {
      type: [String, Number]
    },
    titleModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:title'],
  setup (props, context) {
    const handleInput = (event) => {
      let value = event.target.value;
      if (props.titleModifiers.capitalize) {
        value = value.toUpperCase()
      }
      context.emit('update:title', value)
    }
    return {
      handleInput
    }
  }
})

component_event_app.mount('#component-event-app')
