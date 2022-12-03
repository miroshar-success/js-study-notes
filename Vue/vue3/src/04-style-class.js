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
    return {
      isActive,
      classObject,
      computedClassObject,
      classArray
    }
  }
})

style_class_app.mount('#style-class-app')