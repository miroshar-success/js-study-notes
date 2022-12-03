const mustache_app = createApp({
  setup () {
    const message = ref('hello world')
    const raw_html = ref('<span style="color: red">This should be red.</span>')
    const numberAttributeId = ref(123)
    const undefinedAttributeId = ref(undefined)
    const nullAttributeId = ref(null)
    const stringAttributeId = ref('123')
    const emptyStringAttribute = ref('')
    const emptyStringDisabled = ref('')
    const falseDisabled = ref(false)
    const trueDisabled = ref(true)
    const attrObject = ref({
      id: 'container',
      class: 'wrapper'
    })
    const number = ref(1)
    const ok = ref(false)
    const id = ref(123)
    const getDate = () => new Date().getTime()
    const getTimeStamp = () => Date.now()
    const attribute = ref('href')
    const seen = ref(true)
    const url = ref('http://www.baidu.com')
    const complex_attribute = computed(() => attribute.value + 'hello')
    return {
      message,
      id,
      getDate,
      getTimeStamp,
      raw_html,
      numberAttributeId,
      undefinedAttributeId,
      nullAttributeId,
      stringAttributeId,
      emptyStringAttribute,
      emptyStringDisabled,
      falseDisabled,
      trueDisabled,
      attrObject,
      number,
      ok,
      attribute,
      seen,
      complex_attribute,
      url
    }
  }
})

mustache_app.mount('#mustache-app')