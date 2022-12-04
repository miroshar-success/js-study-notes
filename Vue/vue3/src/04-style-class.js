const style_class_app = createApp({
  setup () {
    const isActive = ref(true)
    const classObject = ref({
      active: true,
      'text-danger': false,
      'primary': true,
      danger: true
    })
    // 计算属性
    const computedClassObject = computed(() => ({
      'text-danger': true,
      'danger': true,
      'primary': true
    }))
    // class 数组
    const classArray = ref(['danger', 'primary'])

    const classArrayObject = ref([{active: true, danger: true}, 'error'])
    return {
      isActive,
      classObject,
      computedClassObject,
      classArray,
      classArrayObject
    }
  }
})

// 传递class到组件
style_class_app.component('todo-list', {
  template: `<ul>
    <li v-for='item in todo_list' :key='item.id'>{{item.text}}</li>
  </ul>`,
  setup () {
    return {
      todo_list: [
        {
          text: 'Hello World',
          id: 1
        },
        {
          text: '你好 世界',
          id: 2
        }
      ]
    }
  }
})

// 绑定样式
style_class_app.component('style-component', {
  template: `<div>
    <div :style='styleObject'>Hello World</div>
    <div :style='{
      color,
      fontSize
    }'>你好 世界</div>
    <div :style='[baseStyle, overrideStyle]'>样式绑定数组</div>
  </div>`,
  setup () {
    const color = ref('blue')
    const fontSize = ref('30px')
    const baseStyle = ref({
      color: 'blue',
      fontSize: '30px'
    })
    const overrideStyle = ref({
      fontStyle: 'italic',
      fontWeight: 'bold'
    })
    return {
      styleObject: {
        fontSize: '20px',
        color: 'red'
      },
      color,
      fontSize,
      baseStyle,
      overrideStyle
    }
  }
})

style_class_app.mount('#style-class-app')