const computed_app = createApp({
  setup () {
    const author = ref({
      name: 'John Doe',
      books: [
        'Vue 2 - Advanced',
        'Vue 3 - Basig Guide',
        'Vue 4 - The Mystery'
      ]
    })
    const count = ref(0)
    const publishedBooksMessage = computed(() => {
      console.log('computed invoked')
      return author.value.books.length > 0 ? 'Yes' : 'No'
    })
    const bookMessageMethod = () => {
      console.log('method invoked')
      return author.value.books.length > 0 ? 'Yes' : 'No'
    }
    const increment = () => {
      count.value += 1
    }
    const now = computed(() => Date.now())

    // 计算属性
    const firstName = ref('kyrie')
    const lastName = ref('irving')
    const fullName = computed({
      get() {
        return firstName.value + '-' + lastName.value
      },
      set(newValue) {
        [firstName.value, lastName.value] = newValue.split('-')
      }
    })
    return {
      author,
      count,
      increment,
      now,
      firstName,
      lastName,
      fullName,
      publishedBooksMessage,
      bookMessageMethod
    }
  }
})
const computed_root = computed_app.mount('#computed-app')
console.log(computed_app)
console.log(computed_root)