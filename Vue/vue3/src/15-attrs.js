const attrs_app = createApp({
  setup () {
    const increment = () => {
      console.log('hello --- 父组件')
    }
    return {
      increment
    }
  }
})

attrs_app.component('primary-button', {
  template: `<div @click='handleClick'>
    <button class='button' :style='styles'><slot>primary-button</slot></button>
    <button class='button' :style='styles'>click me</button>
  </div>  
  `,
  setup () {
    const handleClick = () => {
      console.log('子组件。。。')
    }
    return {
      handleClick,
      styles: {
        outline: 'none',
        border: '1px solid #e8e8e8'
      }
    }
  }
})

// 组件深层继承
attrs_app.component('parent-component', {
  template: `<child-component></child-component>`
})
attrs_app.component('child-component', {
  template: `<div>我是子组件</div>`
})


// 禁用自动继承到根组件
attrs_app.component('user-component', {
  template: `<div>
    <div>hello, user component</div>
    <div v-bind='$attrs'>{{$attrs}}</div>
  </div>`,
  inheritAttrs: false
})

// 多个根结点
attrs_app.component('multiple-root-component', {
  template: `<div>hello</div><div v-bind='$attrs'>world</div>`,
  setup (props, context) {
    console.log(context)
  }
})

attrs_app.mount('#attrs-app')