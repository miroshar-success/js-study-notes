console.log('Vue',Vue)
const message_component = Vue.component('message_component', {
  template:`<div><div v-for='message in messages'>
    {{message.type === 'success' ? 'success' : 'error'}}
  {{message.text}}</div></div>`,
  data() {
    return {
      messages:[],
      id:0
    }
  },
  methods: {
    success(options) {
      const merge_options = {
        duration: 1500,
        ...options,
        type:'success',
        id:this.id++
      }
      this.messages.push(merge_options)
      if(options.duration !== 0) {
        const timer = setTimeout(() => {
          this.remove(merge_options.id)
          clearTimeout(timer)
        }, options.duration)
      }else{
        return () => {
          this.remove(merge_options.id)
        }
      }
    },
    error(options) {
      const merge_options = {
        duration:1500,
        ...options,
        type:'error',
        id:this.id++
      }
      this.messages.push(merge_options)
      if(options.duration !== 0) {
        const timer = setTimeout(() => {
          this.remove(merge_options.id)
          clearTimeout(timer)
        }, options.duration)
      }else{
        return () => {
          this.remove(merge_options.id)
        }
      }
    },
    remove(id) {
      this.messages = this.messages.filter(item => item.id !==id)
    }
  }
})


const _message = (() => {
  const div = document.createElement('div')
  const vm = new Vue({
    render: h => h(message_component)
  }).$mount(div)
  document.body.appendChild(vm.$el)
  return vm.$children[0]
})()

_message.success({text:'我成功了', duration:3000})
_message.success({text:'我也成功了', duration:4000})
_message.error({text:'我失败了', duration:5000})


// --------- 全局方法 --------
const _install = {
  install(Vue, options) {
    console.log('options', options)
    Vue.prototype.$message = {
      success:_message.success,
      error: _message.error
    }
  }
}

Vue.use(_install)


new Vue({
  el:'#plugin-demo',
  methods: {
    get_message() {
      this.$message.success({text:'我是点击按钮成功的', duration:4000})
    }
  }
})


